const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_CHAT_ID || process.env.ADMIN_CHAT_ID;

if (!token || !adminChatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'Здравствуйте! Отправьте, пожалуйста, краткое описание заявки: где работает приложение, что нужно перенести и ваши контакты. После этого мы подготовим консультацию.');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const isAdmin = chatId.toString() === adminChatId.toString();

  if (isAdmin) {
    return;
  }

  if (msg.text && msg.text.trim().startsWith('/start')) {
    return;
  }

  const senderName = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(' ') || 'Клиент';
  const userLink = msg.from.username ? `@${msg.from.username}` : `ID: ${msg.from.id}`;
  const applicationText = msg.text ? msg.text.trim() : '[нет текста]';

  await bot.sendMessage(chatId, 'Спасибо! Ваша заявка принята. Мы свяжемся с вами для личной консультации в ближайшее время.');

  const adminMessage = [
    '*Новая заявка через Telegram*',
    `*Клиент:* ${senderName}`,
    `*Контакт:* ${userLink}`,
    `*Сообщение:*`,
    applicationText
  ].join('\n');

  await bot.sendMessage(adminChatId, adminMessage, { parse_mode: 'Markdown' });
});
