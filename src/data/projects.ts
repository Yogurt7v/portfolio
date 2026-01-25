export const projects = [
  {
    id: 1,
    title: 'Мой крутой проект на React',
    description: 'Приложение для управления задачами с использованием Redux.',
    date: '2024-01-20',
    rating: 9,
    screenshots: ['/images/project1-main.png', '/images/project1-detail.png'],
    videoUrl: '/videos/project1-demo.mp4',
    techStack: [
      {
        name: 'React',
      },
      {
        name: 'Redux',
      },
      {
        name: 'TypeScript',
      },
    ],
    category: 'Frontend',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Простой UI Kit',
    description: 'Библиотека кнопок и инпутов на Tailwind.',
    date: '2023-12-05',
    screenshots: ['/images/uikit.png'],
    videoUrl: 'https://youtube.com/yogurt7v',
    techStack: [
      {
        name: 'Tailwind',
      },
    ],
    category: 'UI Components',
    isFeatured: false,
  },
  {
    id: 3,
    title: 'Портфолио',
    description:
      'Портфолио Frontend-разработчика: создание веб-приложений на React, TypeScript и Astro. Чистый код, адаптивная верстка и современный UX/UI. Мои проекты и технический стек',
    date: '2026-01-25',
    screenshots: ['/images/portfolio.png'],
    videoUrl: 'https://youtube.com/yogurt7v',
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
    category: 'UI Components',
    isFeatured: false,
  },
];
