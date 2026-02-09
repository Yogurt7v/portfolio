const skillColors: Record<string, string> = {
  React: 'text-cyan-400',
  TypeScript: 'text-blue-500',
  JavaScript: 'text-yellow-400',
  'Next.js': 'text-white',
  'Nest.js': 'text-rose-600',
  'SQL.js': 'text-emerald-500',
  Tailwind: 'text-teal-400',
  'Three.js': 'text-slate-400',
  Angular: 'text-red-600',
  DevOps: 'text-purple-500',
};

export const skills = [
  { name: 'React', level: 'Middle+' },
  { name: 'JavaScript', level: 'Middle+' },
  { name: 'TypeScript', level: 'Middle' },
  { name: 'Next.js', level: 'Middle' },
  { name: 'Nest.js', level: 'Basic+' },
  { name: 'SQL', level: 'Middle' },
  { name: 'Tailwind', level: 'Middle' },
  { name: 'Three.js', level: 'Basic' },
  { name: 'Angular', level: 'Basic' },
  { name: 'DevOps', level: 'Basic' },
];

export const getSkillColor = (name: string): string => {
  return skillColors[name] || 'text-white';
};
