const form = document.getElementById('lead-form');
const message = document.getElementById('form-message');

const translations = {
  ru: {
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
      title: 'Общий план миграции приложения на сервер клиента',
      step1Title: 'Проектирование',
      step1: 'Анализируем архитектуру и готовим конфигурацию окружения для фронтенда, бэкенда, базы данных и прокси.',
      step2Title: 'Перенос логики',
      step2: 'Переносим серверную логику из облачной платформы на собственный серверный слой для безопасности и контроля.',
      step3Title: 'Развёртывание',
      step3: 'Настраиваем инфраструктуру и запускаем приложение в Docker на целевом сервере.',
      step4Title: 'Проверка',
      step4: 'Тестируем работу сервисов и сетевое взаимодействие внутри новой среды.'
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
      title: 'General migration plan for the client server',
      step1Title: 'Design',
      step1: 'Analyze architecture and prepare the environment for frontend, backend, database, and proxy.',
      step2Title: 'Logic migration',
      step2: 'Move server logic from the cloud platform to your own server layer for security and control.',
      step3Title: 'Deployment',
      step3: 'Set up infrastructure and run the application in Docker on the target server.',
      step4Title: 'Validation',
      step4: 'Test service operation and network connections inside the new environment.'
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
      title: 'Plan general de migrare către serverul clientului',
      step1Title: 'Proiectare',
      step1: 'Analizăm arhitectura și pregătim mediul pentru frontend, backend, bază de date și proxy.',
      step2Title: 'Migrare logică',
      step2: 'Mutăm logica serverului din platforma cloud pe un strat server propriu pentru securitate și control.',
      step3Title: 'Dezvoltare',
      step3: 'Configurăm infrastructura și rulăm aplicația în Docker pe serverul țintă.',
      step4Title: 'Validare',
      step4: 'Testăm funcționarea serviciilor și conexiunile de rețea în noul mediu.'
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

function getPageLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  return urlLang && ['ru', 'en', 'ro'].includes(urlLang) ? urlLang : 'ru';
}

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
}

applyLanguage(getPageLanguage());

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
    } else {
      message.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
    }
  } catch (error) {
    console.error('Ошибка отправки:', error);
    message.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
  }
});

