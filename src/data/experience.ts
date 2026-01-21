export interface ExperienceItem {
  period: string;
  company: string;
  position: string;
  description: string;
  achievements: string[];
  tags?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    period: '2023 - Present',
    company: 'Tech Innovations Inc.',
    position: 'Senior Frontend Developer',
    description:
      'Leading frontend development for enterprise-level SaaS applications using React, TypeScript, and modern web technologies.',
    achievements: [
      'Reduced application bundle size by 40% through code splitting and lazy loading',
      'Implemented comprehensive testing strategy increasing coverage to 90%',
      'Mentored 3 junior developers and established team best practices',
      'Improved application performance scores from 65 to 95 in Lighthouse',
    ],
    tags: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
  },
  {
    period: '2021 - 2023',
    company: 'Digital Solutions LLC',
    position: 'Frontend Developer',
    description:
      'Developed responsive web applications and collaborated with design teams to create seamless user experiences.',
    achievements: [
      'Built 10+ reusable component libraries used across multiple projects',
      'Integrated real-time features using WebSockets and Socket.io',
      'Optimized rendering performance reducing FCP by 60%',
      'Collaborated with UX team to implement design system',
    ],
    tags: ['React', 'Redux', 'Sass', 'WebSocket'],
  },
  {
    period: '2019 - 2021',
    company: 'Web Studio Creative',
    position: 'Junior Web Developer',
    description:
      'Started my career building websites and small web applications for various clients.',
    achievements: [
      'Developed 50+ responsive websites for small businesses',
      'Implemented SEO best practices improving client rankings',
      'Learned modern JavaScript frameworks and build tools',
      'Contributed to open-source projects to improve skills',
    ],
    tags: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP'],
  },
];
