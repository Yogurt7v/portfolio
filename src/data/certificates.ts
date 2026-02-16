let base = [
  {
    id: 1,
    name: 'HTML',
    source: '/сertificate/html.webp',
    issuer: 'Result School',
  },
  {
    id: 2,
    name: 'Angular',
    source: '/сertificate/angular.webp',
    issuer: 'Sololearn',
    date: '07-06-2024',
  },
  {
    id: 3,
    name: 'JavaScrypt Intermediate',
    source: '/сertificate/js-int.webp',
    issuer: 'Sololearn',
    date: '08-07-2024',
  },
  {
    id: 4,
    name: 'Junior Fronted-разработчик',
    source: '/сertificate/junior2.webp',
    issuer: 'Result University',
    date: '08-05-2024',
  },
  {
    id: 5,
    name: 'Middle-разработчик',
    source: '/сertificate/middle.webp',
    issuer: 'Result University',
    date: '08-07-2025',
  },
];

let added = {
  id: 6,
  name: 'В процессе',
  source: '/сertificate/noname.webp',
  issuer: '',
  date: 'Скоро',
};

export let certificates;

if (base.length % 2 === 0) {
  certificates = base;
} else {
  certificates = [...base, added];
}
