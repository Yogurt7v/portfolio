import React from 'react';
import { motion } from 'framer-motion';
import { getSkillColor } from '../data/skills';

interface Skill {
  name: string;
  level: string;
}

interface SkillsProps {
  title?: string;
  skillsArray?: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ title = 'Stack', skillsArray = [] }) => {
  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center italic uppercase">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skillsArray.map((skill, i) => (
          <motion.div
            key={`${skill.name}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="p-4 rounded-2xl bg-white/3 border border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all"
          >
            <div
              className={`text-2xl font-black mb-2 transition-transform group-hover:scale-110 ${getSkillColor(skill.name)}`}
            >
              {skill.name}
            </div>
            <div className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">
              {skill.level}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
