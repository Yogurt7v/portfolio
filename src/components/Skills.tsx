import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';

const Skills = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center italic uppercase">Stack</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
            className="p-6 rounded-2xl border border-white/5 bg-white/2 text-center backdrop-blur-sm transition-colors hover:border-white/20 group"
          >
            <div
              className={`text-2xl font-black mb-2 transition-transform group-hover:scale-110 ${skill.color}`}
            >
              {skill.name}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              {skill.level}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
