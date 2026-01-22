задание на завтра

1. Мобильное меню (Гамбургер)
   Мы обсуждали «капсульный» хедер, но на экранах смартфонов ссылки «About», «Projects», «Skills» могут не поместиться в одну строку или будут слишком мелкими.

Что можно сделать: Добавить анимированную иконку меню, которая при клике открывает полноэкранную шторку с размытием (blur).

2. Страница «О себе» (Финальный штрих)
   Мы создали секцию с фото, но не добавили туда ссылку на резюме (CV).

Что можно сделать: Добавить стильную кнопку «Download CV» с иконкой загрузки, которая будет светиться при наведении.

3. Контактная форма
   У нас есть футер, но нет активного способа связи напрямую с сайта.

Что можно сделать: Добавить лаконичную форму (Имя, Email, Сообщение) в конце страницы, которая будет отправлять письма тебе на почту (например, через Formspree или EmailJS).

4. Оптимизация (SEO и Meta)
   Чтобы при отправке ссылки в Telegram или Discord появлялась красивая карточка с твоим фото и описанием.

Что можно сделать: Настроить OpenGraph теги в Layout.astro.

5. сделать Readme

6. возможно сменить основной шрифт

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
