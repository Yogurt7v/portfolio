const skillColors: Record<string, string> = {
  React: 'text-cyan-400',
  TypeScript: 'text-blue-500',
  'Node.js': 'text-green-500',
  'Next.js': 'text-white',
  Tailwind: 'text-sky-400',
  'Three.js': 'text-pink-500',
};

export const skills = [
  { name: 'React', level: 'Senior' },
  { name: 'TypeScript', level: 'Expert' },
  { name: 'Node.js', level: 'Middle+' },
  { name: 'Next.js', level: 'Senior' },
  { name: 'Tailwind', level: 'Expert' },
  { name: 'Three.js', level: 'Basic' },
  { name: 'Angular', level: 'Basic' },
];

export const getSkillColor = (name: string): string => {
  return skillColors[name] || 'text-white';
};
