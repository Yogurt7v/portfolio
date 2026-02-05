# Портфолио

Это мой персональный портфолио-сайт, созданный с использованием современных веб-технологий для демонстрации моих навыков, проектов и достижений.

## 🚀 Технологии

Проект построен с использованием следующих технологий:

- **Astro** - Фреймворк для создания быстрых статических сайтов
- **React** - Библиотека для создания пользовательских интерфейсов
- **TypeScript** - Типизированный JavaScript для улучшения надежности кода
- **Tailwind CSS** - Утилитарный CSS-фреймворк для быстрой стилизации
- **Framer Motion** - Библиотека для создания анимаций в React
- **React GitHub Calendar** - Компонент для отображения GitHub активности
- **@astrojs/check** - Инструмент для проверки типов в Astro
- **@astrojs/react** - Интеграция React с Astro
- **@tailwindcss/vite** - Плагин Vite для Tailwind CSS
- **@types/node**, **@types/react**, **@types/react-dom** - Типы для Node.js и React

## 🛠 Установка и запуск

1. Клонируйте репозиторий:

   ```sh
   git clone <url-репозитория>
   cd Portfolio
   ```

2. Установите зависимости:

   ```sh
   npm install
   ```

3. Запустите сервер разработки:

   ```sh
   npm run dev
   ```

   Сайт будет доступен по адресу `http://localhost:4321`.

## 📁 Структура проекта

```
/
├── public/
│   ├── fav.svg
│   ├── resume.pdf
│   └── сertificate/
│       ├── angular.webp
│       ├── html.webp
│       ├── js-int.webp
│       ├── junior.webp
│       ├── junior2.webp
│       └── middle.webp
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Achievements.tsx
│   │   ├── BackgroundGlow.tsx
│   │   ├── ContactModal.tsx
│   │   ├── Footer.tsx
│   │   ├── GitHubCalendar.tsx
│   │   ├── Header.tsx
│   │   ├── index.ts
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   ├── Portfolio.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Skills.tsx
│   │   ├── TechFilters.tsx
│   │   ├── Timeline.tsx
│   │   └── VideoPlayer.tsx
│   ├── content/
│   │   └── config.ts
│   ├── data/
│   │   ├── aboutMe.ts
│   │   ├── certificates.ts
│   │   ├── experience.ts
│   │   ├── navLinks.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── layouts/
│   │   └── MainLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── constants.ts
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 🧞 Команды

Все команды выполняются из корневой директории проекта в терминале:

| Команда                   | Действие                                                     |
| :------------------------ | :----------------------------------------------------------- |
| `npm install`             | Установка зависимостей                                       |
| `npm run dev`             | Запуск локального сервера разработки на `localhost:4321`     |
| `npm run build`           | Сборка production версии в `./dist/`                         |
| `npm run preview`         | Предварительный просмотр сборки перед развертыванием         |
| `npm run astro ...`       | Запуск CLI команд Astro, например `astro add`, `astro check` |
| `npm run astro -- --help` | Получение справки по использованию Astro CLI                 |

## 📄 Описание секций

- **О себе (About)** - Информация обо мне с фото и ссылкой на резюме
- **Навыки (Skills)** - Мои технические навыки с фильтрами
- **Проекты (Portfolio)** - Портфолио моих проектов
- **Опыт (Timeline)** - Хронология моего профессионального опыта
- **Достижения (Achievements)** - Сертификаты и награды
- **GitHub Calendar** - Визуализация моей активности на GitHub
- **Контакты (Footer)** - Контактная информация

## 🎨 Особенности

- Адаптивный дизайн для всех устройств
- Темная тема с анимациями
- Интерактивные компоненты
- Оптимизированная производительность благодаря Astro
- SEO оптимизация

## 📧 Контакты

Если у вас есть вопросы или предложения, свяжитесь со мной через контактную форму на сайте или по email.
