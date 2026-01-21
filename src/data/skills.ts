const colors = [
  'text-cyan-400',
  'text-blue-500',
  'text-green-500',
  'text-white',
  'text-sky-400',
  'text-pink-500',
];

export const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const skills = [
  { name: 'React', color: getRandomColor(), level: 'Senior' },
  { name: 'TypeScript', color: getRandomColor(), level: 'Expert' },
  { name: 'Node.js', color: getRandomColor(), level: 'Middle+' },
  { name: 'Next.js', color: getRandomColor(), level: 'Senior' },
  { name: 'Tailwind', color: getRandomColor(), level: 'Expert' },
  { name: 'Three.js', color: getRandomColor(), level: 'Basic' },
  { name: 'React', color: getRandomColor(), level: 'Senior' },
  { name: 'TypeScript', color: getRandomColor(), level: 'Expert' },
  { name: 'Node.js', color: getRandomColor(), level: 'Middle+' },
  { name: 'Three.js', color: getRandomColor(), level: 'Basic' },
];
