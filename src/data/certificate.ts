let id = 1;

let base = [
  {
    id: id++,
    name: 'HTML',
    source: '/certificate/html.webp',
    preview: '/certificate/html-mini.webp',
    issuer: 'Result School',
    date: '06-07-2023',
  },
  {
    id: id++,
    name: 'Angular',
    source: '/certificate/angular.webp',
    preview: '/certificate/angular-mini.webp',
    issuer: 'Sololearn',
    date: '07-06-2024',
  },
  {
    id: id++,
    name: 'JavaScrypt Intermediate',
    source: '/certificate/js-int.webp',
    preview: '/certificate/js-int-mini.webp',
    issuer: 'Sololearn',
    date: '08-07-2024',
  },
  {
    id: id++,
    name: 'Junior Fronted-разработчик',
    source: '/certificate/junior2.webp',
    preview: '/certificate/junior2-mini.webp',
    issuer: 'Result University',
    date: '08-05-2024',
  },
  {
    id: id++,
    name: 'Middle-разработчик',
    source: '/certificate/middle.webp',
    preview: '/certificate/middle-mini.webp',
    issuer: 'Result University',
    date: '08-07-2025',
  },
  {
    id: id++,
    name: 'HTML средний уровень',
    source: '/certificate/MC-HTML.webp',
    preview: '/certificate/MC-HTML-mini.webp',
    issuer: 'Минцифры',
    date: '04-06-2026',
  },
  {
    id: id++,
    name: 'CSS средний уровень',
    source: '/certificate/MC-CSS.webp',
    preview: '/certificate/MC-CSS-mini.webp',
    issuer: 'Минцифры',
    date: '04-06-2026',
  },
  {
    id: id++,
    name: 'JS продвинутый уровень',
    source: '/certificate/MC-JS.webp',
    preview: '/certificate/MC-JS-mini.webp',
    issuer: 'Минцифры',
    date: '04-06-2026',
  },
  {
    id: id++,
    name: 'Docker начальный уровень',
    source: '/certificate/MC-Docker.webp',
    preview: '/certificate/MC-Docker-mini.webp',
    issuer: 'Минцифры',
    date: '05-06-2026',
  },
];

let added = {
  id: id++,
  name: 'В процессе',
  source: '/certificate/noname.webp',
  preview: '/certificate/noname-mini.webp',
  issuer: '',
  date: 'Скоро',
};

export let certificates: any;

if (base.length % 3 === 0) {
  certificates = base;
} else {
  certificates = [...base, added];
}
