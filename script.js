const form = document.getElementById('lead-form');
const message = document.getElementById('form-message');
const leadList = document.getElementById('lead-list');
const langSelect = document.getElementById('lang-select');

const translations = {
  ru: {
    languageLabel: 'Язык',
    hero: {
      eyebrow: 'Перенос готового приложения на другой сервер',
      title: 'Переносим сгенерированное приложение на нужный вам сервер за 1 день',
      text: 'Если приложение уже создано с помощью AI, мы перенесём его на VPS, облако, сервер клиента или другой хостинг.',
      cta: 'Оставить заявку',
      secondary: 'Что входит',
      cardTitle: 'Что вы получаете',
      card1: 'Работающее приложение на новом сервере',
      card2: 'Настройка домена и доступа',
      card3: 'Перенос базы и конфигурации',
      card4: 'Срок — 1 день'
    },
    services: {
      eyebrow: 'Услуга',
      title: 'С каких AI-платформ можно создать приложение и куда его перенести',
      create1: 'Вы можете создавать приложения и прототипы прямо на этих площадках.',
      create2: 'Подходят для генерации интерфейсов, сервисов и MVP.',
      migrate1: 'С этих платформ чаще всего и делаем перенос на другой сервер.',
      migrate2: 'Это целевые среды, куда переносим приложение без потери работы.',
      oneDay: 'Услуга — 1 день'
    },
    form: {
      eyebrow: 'Оставьте заявку',
      title: 'Опишите текущий сервер и целевую среду — и мы перенесём приложение за 1 день',
      text: 'Кратко расскажите, где сейчас работает приложение и куда его нужно перенести.',
      name: 'Имя',
      namePlaceholder: 'Иван',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      phone: 'Телефон',
      phonePlaceholder: '+7 900 000 00 00',
      language: 'Язык',
      server: 'Текущая и целевая среда',
      serverPlaceholder: 'Cloudflare, VPS, Azure, сервер клиента',
      project: 'Что нужно перенести',
      projectPlaceholder: 'Сайт, API, база, cron, домен...',
      submit: 'Отправить заявку'
    },
    leads: {
      eyebrow: 'Сохранённые заявки',
      title: 'Список заявок для дальнейшей связи'
    }
  },
  en: {
    languageLabel: 'Language',
    hero: {
      eyebrow: 'Migration of a ready-made application to another server',
      title: 'We transfer a generated application to the server you need in 1 day',
      text: 'If the application is already built with AI, we will move it to a VPS, cloud, client server or another host.',
      cta: 'Request a quote',
      secondary: 'What is included',
      cardTitle: 'What you get',
      card1: 'A working application on a new server',
      card2: 'Domain and access setup',
      card3: 'Database and configuration transfer',
      card4: 'Delivery — 1 day'
    },
    services: {
      eyebrow: 'Service',
      title: 'Which AI platforms can create an app and where we can move it',
      create1: 'We build apps and prototypes directly on these platforms.',
      create2: 'They are suitable for generating interfaces, services and MVPs.',
      migrate1: 'We most often migrate apps from these platforms to another server.',
      migrate2: 'These are the target environments where we move the application without losing its functionality.',
      oneDay: 'Service — 1 day'
    },
    form: {
      eyebrow: 'Leave a request',
      title: 'Describe the current server and target environment — we will move the app in 1 day',
      text: 'Briefly tell us where the application runs now and where it should be moved.',
      name: 'Name',
      namePlaceholder: 'John',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      phone: 'Phone',
      phonePlaceholder: '+1 555 000 00 00',
      language: 'Language',
      server: 'Current and target environment',
      serverPlaceholder: 'Cloudflare, VPS, Azure, client server',
      project: 'What needs to be moved',
      projectPlaceholder: 'Website, API, database, cron, domain...',
      submit: 'Send request'
    },
    leads: {
      eyebrow: 'Saved requests',
      title: 'List of requests for follow-up'
    }
  },
  ro: {
    languageLabel: 'Limbă',
    hero: {
      eyebrow: 'Migrarea unei aplicații gata făcute pe alt server',
      title: 'Transferăm aplicația generată pe serverul potrivit în 1 zi',
      text: 'Dacă aplicația este deja creată cu AI, o transferăm pe VPS, cloud, serverul clientului sau alt host.',
      cta: 'Solicită un oferte',
      secondary: 'Ce este inclus',
      cardTitle: 'Ce primești',
      card1: 'O aplicație funcțională pe un server nou',
      card2: 'Configurarea domeniului și a accesului',
      card3: 'Transferul bazei de date și al configurației',
      card4: 'Termen — 1 zi'
    },
    services: {
      eyebrow: 'Serviciu',
      title: 'De pe ce platforme AI poți crea o aplicație și unde o putem muta',
      create1: 'Construim aplicații și prototipuri direct pe aceste platforme.',
      create2: 'Sunt potrivite pentru generarea interfețelor, serviciilor și MVP-urilor.',
      migrate1: 'De pe aceste platforme realizăm cel mai des migrarea pe un alt server.',
      migrate2: 'Acestea sunt mediile țintă în care transferăm aplicația fără a-i pierde funcționalitatea.',
      oneDay: 'Serviciu — 1 zi'
    },
    form: {
      eyebrow: 'Lăsați o solicitare',
      title: 'Descrieți serverul actual și mediul țintă — și vom muta aplicația în 1 zi',
      text: 'Spuneți pe scurt unde rulează aplicația acum și unde trebuie mutată.',
      name: 'Nume',
      namePlaceholder: 'Ion',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      phone: 'Telefon',
      phonePlaceholder: '+40 700 000 000',
      language: 'Limbă',
      server: 'Mediul actual și țintă',
      serverPlaceholder: 'Cloudflare, VPS, Azure, serverul clientului',
      project: 'Ce trebuie mutat',
      projectPlaceholder: 'Site, API, bază de date, cron, domeniu...',
      submit: 'Trimite cererea'
    },
    leads: {
      eyebrow: 'Cereri salvate',
      title: 'Lista cererilor pentru urmărire'
    }
  }
};

function applyLanguage(lang) {
  const t = translations[lang] || translations.ru;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const keyPath = element.getAttribute('data-i18n');
    const value = keyPath.split('.').reduce((acc, part) => acc && acc[part], t);
    if (typeof value === 'string') {
      element.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const keyPath = element.getAttribute('data-i18n-placeholder');
    const value = keyPath.split('.').reduce((acc, part) => acc && acc[part], t);
    if (typeof value === 'string') {
      element.placeholder = value;
    }
  });

  const selectLanguage = document.querySelector('[name="language"]');
  if (selectLanguage) {
    selectLanguage.value = lang;
  }
}

langSelect.addEventListener('change', (event) => {
  applyLanguage(event.target.value);
});

async function loadLeads() {
  try {
    const response = await fetch('/api/leads');
    const leads = await response.json();
    renderLeads(leads);
  } catch (error) {
    console.error('Не удалось загрузить лиды:', error);
    renderLeads([]);
  }
}

function renderLeads(leads) {
  if (!leads.length) {
    leadList.innerHTML = '<div class="empty-state">Пока нет сохранённых заявок. Заполните форму справа.</div>';
    return;
  }

  leadList.innerHTML = leads
    .slice()
    .reverse()
    .map((lead) => {
      const createdAt = new Date(lead.createdAt).toLocaleString('ru-RU');
      return `
        <article>
          <strong>${lead.name || 'Без имени'}</strong>
          <div class="muted">${lead.company || 'Компания не указана'} · ${createdAt}</div>
          <div>${lead.email || ''}</div>
          <div>${lead.project || ''}</div>
        </article>
      `;
    })
    .join('');
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const lead = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });

    const result = await response.json();
    if (result.ok) {
      message.textContent = 'Заявка отправлена в Telegram и сохранена. Мы свяжемся с вами в ближайшее время.';
      form.reset();
      loadLeads();
    } else {
      message.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
    }
  } catch (error) {
    console.error('Ошибка отправки:', error);
    message.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
  }
});

loadLeads();
