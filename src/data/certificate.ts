let base = [
  {
    id: 1,
    name: 'HTML',
    source: '/certificate/html.webp',
    preview: '/certificate/html-mini.webp',
    issuer: 'Result School',
    date: '06-07-2023',
  },
  {
    id: 2,
    name: 'Angular',
    source: '/certificate/angular.webp',
    preview: '/certificate/angular-mini.webp',
    issuer: 'Sololearn',
    date: '07-06-2024',
  },
  {
    id: 3,
    name: 'JavaScrypt Intermediate',
    source: '/certificate/js-int.webp',
    preview: '/certificate/js-int-mini.webp',
    issuer: 'Sololearn',
    date: '08-07-2024',
  },
  {
    id: 4,
    name: 'Junior Fronted-разработчик',
    source: '/certificate/junior2.webp',
    preview: '/certificate/junior2-mini.webp',
    issuer: 'Result University',
    date: '08-05-2024',
  },
  {
    id: 5,
    name: 'Middle-разработчик',
    source: '/certificate/middle.webp',
    preview: '/certificate/middle-mini.webp',
    issuer: 'Result University',
    date: '08-07-2025',
  },
];

let added = {
  id: 6,
  name: 'В процессе',
  source: '/certificate/noname.webp',
  preview: '/certificate/noname-mini.webp',
  issuer: '',
  date: 'Скоро',
};

export let certificates;

if (base.length % 2 === 0) {
  certificates = base;
} else {
  certificates = [...base, added];
}
