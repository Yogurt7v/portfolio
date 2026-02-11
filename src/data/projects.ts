export const projects = [
  {
    id: 1,
    title: 'Портфолио',
    description:
      'Портфолио Frontend-разработчика: создание веб-приложений на React, TypeScript и Astro. Чистый код, адаптивная верстка и современный UX/UI. Мои проекты и технический стек',
    date: '2026-01-25',
    screenshots: [
      '/images/portfolio/1.webp',
      '/images/portfolio/2.webp',
      '/images/portfolio/3.webp',
      '/images/portfolio/4.webp',
    ],
    videoUrl: '/videos/portfolio.mp4',
    techStack: [
      {
        name: 'Astro JS',
      },
      {
        name: 'React',
      },
      {
        name: 'Typescript',
      },
      {
        name: 'Framer Motion',
      },
      {
        name: 'Tailwind',
      },
    ],
    isFeatured: true,
    gitHubLink: 'https://github.com/Yogurt7v/portfolio',
    link: '',
  },
  {
    id: 2,
    title: 'Check Repeat',
    description:
      'Check Repeat — это приложение для проверок дубликатов счетов-фактур. Проверяются списки полученных/выданных счетов-фактур на совпадения по суммам, по датам, по номерам и по контрагентам. Выстраиваются таблицы совпадений с фильтром по контрагенту для удобства проверки.',
    date: '2026-01-18',
    screenshots: [
      '/images/check/ch1.webp',
      '/images/check/ch2.webp',
      '/images/check/ch3.webp',
      '/images/check/ch4.webp',
    ],
    videoUrl: '/videos/CheckRepeat.mp4',
    techStack: [
      {
        name: 'Vite',
      },
      {
        name: 'React',
      },
      {
        name: 'Mui Material',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/CheckRepeat',
    link: 'https://check-repeat.vercel.app/',
  },
  {
    id: 3,
    title: 'QuickChat',
    description:
      'Веб-чат для  обмена сообщениями в реальном времени с поддержкой PWA. Регистрацию пользователей, приватные беседы, push-уведомления, онлайн-статусы, пересылку файлов и drag-and-drop организацию чатов. Построенный на React 19 и Firebase с интеграцией Supabase, адаптивный дизайн для всех устройств с темной темой .',
    date: '2025-12-31',
    screenshots: ['/images/quick/1.webp', '/images/quick/2.webp', '/images/quick/3.webp'],
    videoUrl: '/videos/quick.mp4',
    techStack: [
      {
        name: 'Vite',
      },
      {
        name: 'React',
      },
      {
        name: 'Supabase',
      },
      {
        name: 'Zustand',
      },
      {
        name: 'Markdown',
      },
      {
        name: 'CI/CD',
      },
      {
        name: 'Dnd-Kit',
      },
    ],
    isFeatured: true,
    gitHubLink: 'https://github.com/Yogurt7v/QuickChat',
    link: 'https://quickchat-fac82.web.app/',
  },
  {
    id: 4,
    title: 'Cooking Book',
    description:
      'Простенькая практика книги рецептов с регистрацией и добавлением новых рецептов и ингредиентов',
    date: '2025-08-20',
    screenshots: [
      '/images/cook/1.webp',
      '/images/cook/2.webp',
      '/images/cook/3.webp',
      '/images/cook/4.webp',
      '/images/cook/5.webp',
    ],
    videoUrl: '/videos/cook.mp4',
    techStack: [
      {
        name: 'Next',
      },
      {
        name: 'Framer Motion',
      },
      {
        name: 'Next-Auth',
      },
      {
        name: 'Zod',
      },
      {
        name: 'Zustand',
      },
      {
        name: 'Prisma',
      },
      {
        name: 'HeroUi',
      },
      {
        name: 'Typescript',
      },
      {
        name: 'Tailwind',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 5,
    title: 'Astro tutorial',
    description:
      'Пройденная практика Astro. Проект представляет собой персональный блог, созданный с использованием фреймворка Astro. Блог посвящен изучению и экспериментам с Astro, а также публикации записей о веб-разработке.',
    date: '2025-11-04',
    screenshots: ['/images/astro/1.webp', '/images/astro/2.webp', '/images/astro/3.webp'],
    videoUrl: '/videos/astro.mp4',
    techStack: [
      {
        name: 'Astro JS',
      },
      {
        name: 'React',
      },
      {
        name: 'Preact',
      },
      {
        name: 'Markdown',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/Astro-tutorial',
    link: '',
  },
  {
    id: 6,
    title: 'Forms',
    description:
      'Полнофункциональная платформа для создания и управления формами с системой аутентификации пользователей. Backend реализован на NestJS с PostgreSQL и JWT-аутентификацией, Frontend — на Next.js с TypeScript и Tailwind CSS. Проект включает drag-and-drop конструктор форм, аналитику ответов, экспорт данных и поддерживает Google OAuth, полную контейнеризацию через Docker с CI/CD на GitLab.',
    date: '2025-04-30',
    screenshots: [
      '/images/forms/1.webp',
      '/images/forms/2.webp',
      '/images/forms/3.webp',
      '/images/forms/4.webp',
      '/images/forms/5.webp',
    ],
    videoUrl: '/videos/forms.mp4',
    techStack: [
      {
        name: 'Jest',
      },
      {
        name: 'Cypress',
      },
      {
        name: 'Nest',
      },
      {
        name: 'Docker',
      },
      {
        name: 'PostgreSQL',
      },
      {
        name: 'Next',
      },
      {
        name: 'Dnd-Kit',
      },
      {
        name: 'Radix-UI',
      },
      {
        name: 'Axios',
      },
      {
        name: 'Next-Auth',
      },
      {
        name: 'Zod',
      },
      {
        name: 'Zustand',
      },
      {
        name: 'Typescript',
      },
      {
        name: 'CI/CD',
      },
      {
        name: 'Tailwind',
      },
      {
        name: 'Gitlab',
      },
    ],
    isFeatured: true,
    gitHubLink: '',
    link: '',
  },
  {
    id: 7,
    title: 'Real Estate API',
    description:
      'Этот проект представляет собой REST API на базе NestJS для управления недвижимостью (real estate). Он позволяет пользователям регистрироваться, аутентифицироваться, создавать и управлять объявлениями о недвижимости, а также взаимодействовать с ними (лайки).',
    date: '2025-04-30',
    screenshots: ['/images/real-state/1.webp'],
    videoUrl: '',
    techStack: [
      {
        name: 'Jest',
      },

      {
        name: 'Nest',
      },

      {
        name: 'PostgreSQL',
      },

      {
        name: 'Google OAuth',
      },
      {
        name: 'JWT',
      },
      {
        name: 'TypeORM',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/NestJS',
    link: '',
  },
  {
    id: 8,
    title: 'Todo Redux',
    description:
      'Современное приложение для управления задачами в стиле Material Design, созданное с использованием React и Redux. Отличается красивым градиентным фоном, адаптивным дизайном и постоянным хранением данных.',
    date: '2025-04-30',
    screenshots: [
      '/images/todo-redux/1.webp',
      '/images/todo-redux/2.webp',
      '/images/todo-redux/3.webp',
      '/images/todo-redux/4.webp',
    ],
    videoUrl: '/videos/todo-redux.mp4',
    techStack: [
      {
        name: 'Vite',
      },

      {
        name: 'React',
      },

      {
        name: 'Redux',
      },

      {
        name: 'Google OAuth',
      },
      {
        name: 'JWT',
      },
      {
        name: 'TypeORM',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/NestJS',
    link: '',
  },
  {
    id: 9,
    title: 'ArtGen',
    description:
      'Проект ArtGenDeploy - это деплоймент-система для веб-приложения генератора искусства. Проект написан на чистом JavaScript  и демонстрации интеграции CI/CD, Docker-контейнеризации и автоматизации развертывания веб-приложений.',
    date: '2024-10-31',
    screenshots: ['/images/art/1.webp', '/images/art/2.webp', '/images/art/3.webp'],
    videoUrl: '/videos/art.mp4',
    techStack: [
      {
        name: 'JavaScript',
      },

      {
        name: 'Docker',
      },

      {
        name: 'Nginx',
      },

      {
        name: 'Certbot',
      },
      {
        name: 'CI/CD',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/Art-Generator',
    link: '',
  },
  {
    id: 10,
    title: 'Yandex Test',
    description:
      'Тестовое задание Яндекс. Необходимо сделать перемещение объектов с полки в корзину. ',
    date: '2024-10-10',
    screenshots: [
      '/images/yandex/1.webp',
      '/images/yandex/2.webp',
      '/images/yandex/3.webp',
    ],
    videoUrl: '/videos/yandex.mp4',
    techStack: [
      {
        name: 'React',
      },

      {
        name: 'Draggable',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/react-draggable',
    link: '',
  },
  {
    id: 11,
    title: 'Quiz Component',
    description:
      'Интерактивное приложение-викторина, созданное с использованием React, TypeScript и Material-UI. Поддерживает различные типы вопросов, включая вопросы с множественным выбором, текстовым вводом и чекбоксами, с таймером и отслеживанием прогресса.',
    date: '2024-10-02',
    screenshots: [
      '/images/quiz/1.webp',
      '/images/quiz/2.webp',
      '/images/quiz/3.webp',
      '/images/quiz/4.webp',
    ],
    videoUrl: '/videos/quiz.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Vite',
      },

      {
        name: 'Typescript',
      },
      {
        name: 'Material UI',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 12,
    title: 'Meet Hub',
    description:
      'Полнофункциональное веб-приложение для создания и управления мероприятиями, построенное с использованием современных технологий React.',
    date: '2024-09-18',
    screenshots: [
      '/images/meet/1.webp',
      '/images/meet/2.webp',
      '/images/meet/3.webp',
      '/images/meet/4.webp',
    ],
    videoUrl: '/videos/meet.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Next',
      },
      {
        name: 'Next-Auth',
      },
      {
        name: 'Typescript',
      },
      {
        name: 'Tailwind',
      },
      {
        name: 'tRPC',
      },
      {
        name: 'Prisma',
      },
      {
        name: 'SQLite',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/NextApp-SqLite',
    link: '',
  },
  {
    id: 13,
    title: 'Meet Hub',
    description:
      'React-приложение для управления контактами, построенное с использованием TypeScript, Redux и Bootstrap. Этот проект позволяет пользователям просматривать, фильтровать и организовывать контакты, включая группировку по категориям и ведение списка избранных. Наполнение рандомное',
    date: '2024-07-28',
    screenshots: [
      '/images/contacts/1.webp',
      '/images/contacts/2.webp',
      '/images/contacts/3.webp',
      '/images/contacts/4.webp',
    ],
    videoUrl: '/videos/contacts.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Axios',
      },
      {
        name: 'Bootstrap',
      },
      {
        name: 'Formik',
      },
      {
        name: 'Typescript',
      },
      {
        name: 'Redux',
      },
      {
        name: 'Web-Vitals',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 14,
    title: 'Rick and Morty PWA',
    description:
      'Это прогрессивное веб-приложение (PWA), созданное на React с использованием Vite, для изучения вселенной Rick and Morty.',
    date: '2024-07-22',
    screenshots: [
      '/images/rick/1.webp',
      '/images/rick/2.webp',
      '/images/rick/3.webp',
      '/images/rick/4.webp',
    ],
    videoUrl: '/videos/rick.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Vite',
      },
      {
        name: 'Material UI',
      },
      {
        name: 'PWA',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/Rick-MortyPWA.git',
    link: '',
  },
  {
    id: 15,
    title: 'Weather Sounds',
    description:
      'Weather Sounds — веб-приложение для прослушивания звуков погоды (лето, дождь, зима) с фоновыми картинками под каждый тип.',
    date: '2024-06-26',
    screenshots: [
      '/images/weather/1.webp',
      '/images/weather/2.webp',
      '/images/weather/3.webp',
      '/images/weather/4.webp',
    ],
    videoUrl: '/videos/weather.mp4',
    techStack: [
      {
        name: 'TypeScript',
      },
      {
        name: 'Webpack',
      },
      {
        name: 'Create React App',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/WeatherSounds.git',
    link: '',
  },
  {
    id: 16,
    title: 'Todo Tanstack',
    description:
      'React Query Practice — учебное приложение на React для работы с серверным состоянием через TanStack React Query (ранее React Query).',
    date: '2024-06-13',
    screenshots: [
      '/images/todo-tanstack/1.webp',
      '/images/todo-tanstack/2.webp',
      '/images/todo-tanstack/3.webp',
    ],
    videoUrl: '/videos/todo2.mp4',
    techStack: [
      {
        name: 'Vite',
      },
      {
        name: 'React',
      },
      {
        name: 'Axios',
      },
      {
        name: 'Tanstack',
      },
      {
        name: 'Typescript',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 17,
    title: 'Telegram Bot',
    description: 'Telegram-бот на Node.js и фреймворке Grammy. ',
    date: '2024-06-10',
    screenshots: ['/images/telegram-bot/1.webp'],
    videoUrl: '',
    techStack: [
      {
        name: 'Node.js',
      },
      {
        name: 'Grammy',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 18,
    title: 'Next.js Dashboard',
    description:
      'Это учебный проект по созданию дашборда с использованием Next.js. Приложение включает аутентификацию, управление клиентами, счетами и дашборд с аналитикой.',
    date: '2024-06-09',
    screenshots: [
      '/images/next-tutorial/1.webp',
      '/images/next-tutorial/2.webp',
      '/images/next-tutorial/3.webp',
      '/images/next-tutorial/4.webp',
    ],
    videoUrl: '/videos/next.mp4',
    techStack: [
      {
        name: 'Next',
      },
      {
        name: 'Next-Auth',
      },
      {
        name: 'PostgreSQL',
      },
      {
        name: 'TypeScript',
      },
      {
        name: 'Tailwind',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 19,
    title: 'Fast Burger Delivery',
    description:
      'Full-stack веб-приложение: интернет-магазин с панелью администратора, корзиной, заказами, отзывами и промокодами.',
    date: '2024-06-09',
    screenshots: [
      '/images/burger/1.webp',
      '/images/burger/2.webp',
      '/images/burger/3.webp',
      '/images/burger/4.webp',
      '/images/burger/5.webp',
      '/images/burger/6.webp',
      '/images/burger/7.webp',
      '/images/burger/8.webp',
      '/images/burger/9.webp',
    ],
    videoUrl: '/videos/burger.mp4',
    techStack: [
      {
        name: 'Node.js',
      },
      {
        name: 'MongoDB',
      },
      {
        name: 'Mongoose',
      },
      {
        name: 'React',
      },
      {
        name: 'Redux',
      },
      {
        name: 'React Hook Form',
      },
    ],
    isFeatured: true,
    gitHubLink: 'https://github.com/username/diplom',
    link: '',
  },
  {
    id: 20,
    title: 'My Blog Practice App',
    description:
      'Небольшое учебное приложение-блог на React/Redux со стилями на `styled-components`. В качестве бэкенда используется `json-server` на порту 3004.',
    date: '2024-03-01',
    screenshots: ['/images/blog/1.webp', '/images/blog/2.webp', '/images/blog/3.webp'],
    videoUrl: '/videos/blog.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'React Router',
      },
      {
        name: 'Styled Components',
      },
      {
        name: 'React Hook Form',
      },
      {
        name: 'Json-Server',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/Blog',
    link: '',
  },
  {
    id: 21,
    title: 'Captcha Generator',
    description:
      'Компонент генерации CAPTCHA из 6 символов, шум на canvas, проверка ввода, обновление по кнопке и после проверки.',
    date: '2024-03-01',
    screenshots: [
      '/images/captcha/1.webp',
      '/images/captcha/2.webp',
      '/images/captcha/3.webp',
    ],
    videoUrl: '/videos/captcha.mp4',
    techStack: [
      {
        name: 'HTML5',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'Canvas',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/Captcha-Image-with-noise',
    link: '',
  },
  {
    id: 22,
    title: 'Voice to Text',
    description:
      'Voice to Text - это одностраничное приложение, которое позволяет распознавать голос и выводить распознанный текст на экран. Пользователь может выбрать язык распознавания из списка (включая русский, английский и множество других), запустить запись, увидеть результат и сохранить его в текстовый файл.',
    date: '2023-12-18',
    screenshots: ['/images/voice/1.webp', '/images/voice/2.webp', '/images/voice/3.webp'],
    videoUrl: '',
    techStack: [
      {
        name: 'HTML5',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'Web Speech API',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 23,
    title: 'Firebase Todo',
    description:
      'Небольшое приложение‑список дел на React 18 с синхронизацией через Firebase Realtime Database (модульный SDK v9).Добавление, редактирование и удаление задач. Онлайн‑синхронизация в реальном времени. Поиск и сортировка. Адаптивная верстка и улучшенные стили',
    date: '2023-12-11',
    screenshots: [
      '/images/firebase-todo/1.webp',
      '/images/firebase-todo/2.webp',
      '/images/firebase-todo/3.webp',
    ],
    videoUrl: '/videos/todo.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'CSS Modules',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'Create React App',
      },
    ],
    isFeatured: false,
    gitHubLink:
      'https://github.com/Yogurt7v/https---github.com-Yogurt7v-BackupToDoList.git',
    link: '',
  },
  {
    id: 24,
    title: 'XOXO',
    description: 'Простая игра «Крестики‑Нолики» на React с Redux и Tailwind CSS.',
    date: '2023-09-17',
    screenshots: ['/images/xoxo/1.webp', '/images/xoxo/2.webp', '/images/xoxo/3.webp'],
    videoUrl: '/videos/xoxo.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Redux',
      },
      {
        name: 'Tailwind',
      },
    ],
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/React-OX',
    link: '',
  },
  {
    id: 25,
    title: 'Login Page',
    description:
      'Это только фронтенд‑шаблон. Подключите его к вашему бэкенду или провайдеру аутентификации при необходимости.',
    date: '2023-09-21',
    screenshots: ['/images/login/1.webp', '/images/login/2.webp'],
    videoUrl: '/videos/login.mp4',
    techStack: [
      {
        name: 'HTML',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 26,
    title: 'Simple Game',
    description:
      'Небольшая браузерная игра: загадайте число от 1 до 100 и попытайтесь угадать его за 10 попыток. Игра подсказывает, больше или меньше было ваше предположение. По завершении появляется полноэкранный оверлей с большой кнопкой «Играем» для быстрого старта новой партии.',
    date: '2023-09-07',
    screenshots: [
      '/images/simple/1.webp',
      '/images/simple/2.webp',
      '/images/simple/3.webp',
    ],
    videoUrl: '/videos/simple.mp4',
    techStack: [
      {
        name: 'HTML',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
  {
    id: 27,
    title: 'Encryptor',
    description: 'Простой веб-проект для шифрования и дешифрования данных в браузере.',
    date: '2023-10-25',
    screenshots: ['/images/encryptor/1.webp', '/images/encryptor/2.webp'],
    videoUrl: '/videos/encryptor.mp4',
    techStack: [
      {
        name: 'HTML',
      },
      {
        name: 'CSS',
      },
      {
        name: 'JavaScript',
      },
    ],
    isFeatured: false,
    gitHubLink: '',
    link: '',
  },
];
