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
        name: 'Dnd-kit',
      },
    ],
    isFeatured: true,
    gitHubLink: 'https://github.com/Yogurt7v/QuickChat',
    link: 'https://quickchat-fac82.web.app/',
  },
];
