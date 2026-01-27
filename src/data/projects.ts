export const projects = [
  {
    id: 1,
    title: 'ЗАМЕНИ СКРИНШОТЫ И ВИДЕО Портфолио',
    description:
      'Портфолио Frontend-разработчика: создание веб-приложений на React, TypeScript и Astro. Чистый код, адаптивная верстка и современный UX/UI. Мои проекты и технический стек',
    date: '2026-01-25',
    screenshots: [
      '/images/portfolio/1.webp',
      '/images/portfolio/2.webp',
      '/images/portfolio/3.webp',
      '/images/portfolio/4.webp',
    ],
    videoUrl: '/images/portfolio/portfolio.mp4',
    techStack: [
      {
        name: 'Astro js',
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
    isFeatured: false,
    gitHubLink: 'https://github.com/Yogurt7v/portfolio',
    link: '',
  },
  {
    id: 3,
    title: 'QuickChat',
    description:
      'QuickChat — это полнофункциональное приложение для чата с поддержкой регистрации пользователей, создания личных бесед и обмена сообщениями в реальном времени. Приложение использует Firebase для аутентификации и хранения данных, обеспечивая мгновенную синхронизацию сообщений между всеми участниками.',
    date: '2026-01-18',
    screenshots: [
      '/images/check/ch1.webp',
      '/images/check/ch2.webp',
      '/images/check/ch3.webp',
      '/images/check/ch4.webp',
    ],
    videoUrl: '/images/check/CheckRepeat.mp4',
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
    videoUrl: '/images/quick/quick.mp4',
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
    videoUrl: '/images/cook/cook.mp4',
    techStack: [
      {
        name: 'Next',
      },
      {
        name: 'Framer Motion',
      },
      {
        name: 'Next-auth',
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
    videoUrl: '/images/astro/astro.mp4',
    techStack: [
      {
        name: 'Astro',
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
    videoUrl: '/images/forms/forms.mp4',
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
];
