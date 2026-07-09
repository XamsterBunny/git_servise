const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URLSearchParams } = require('url');

const port = process.env.PORT || 8000;
const dataFile = path.join(__dirname, 'leads.json');

function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').trim();
    if (!process.env[key]) {
      process.env[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
}

loadEnvFile();

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

function ensureDataFile() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]', 'utf8');
  }
}

function readLeads() {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } catch (error) {
    return [];
  }
}

function writeLeads(leads) {
  fs.writeFileSync(dataFile, JSON.stringify(leads, null, 2), 'utf8');
}

function sendTelegramMessage(message) {
  if (!telegramBotToken || !telegramChatId) {
    return Promise.resolve();
  }

  const params = new URLSearchParams({ chat_id: telegramChatId, text: message, disable_web_page_preview: 'true' });
  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  return new Promise((resolve) => {
    const req = https.request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, (res) => {
      res.resume();
      res.on('end', resolve);
    });

    req.on('error', resolve);
    req.write(params.toString());
    req.end();
  });
}

function serveStaticFile(filePath, contentType, res) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/lead') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const leads = readLeads();
        const lead = { ...data, createdAt: new Date().toISOString() };
        leads.push(lead);
        writeLeads(leads);

        const text = [
          'Новая заявка с лендинга',
          `Имя: ${lead.name || '—'}`,
          `Email: ${lead.email || '—'}`,
          `Телефон: ${lead.phone || '—'}`,
          `Компания: ${lead.company || '—'}`,
          `Облако: ${lead.cloud || '—'}`,
          `Что переносить: ${lead.project || '—'}`,
          `Подробности: ${lead.details || '—'}`
        ].join('\n');

        await sendTelegramMessage(text);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, lead }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid request' }));
      }
    });

    return;
  }

  if (req.method === 'GET' && req.url === '/api/leads') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(readLeads()));
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.{2}[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml'
  }[extension] || 'application/octet-stream';

  serveStaticFile(filePath, contentType, res);
});

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
  if (!telegramBotToken || !telegramChatId) {
    console.log('Telegram notifications are disabled. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to enable them.');
  } else {
    console.log('Telegram notifications enabled.');
  }
});
