import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants } from '../utils/animations';
import { skills } from '../data/skills';
import SkillCard from '../ui/Stack/SkillCard';

const Stack: React.FC = () => {
  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      {/* Заголовок секции */}
      <div className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
          Стек технологий<span className="text-blue-500">.</span>
        </h2>
        <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
      </div>

      {/* Сетка с навыками */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill, index) => (
          <SkillCard
            key={`${skill.name}-${index}`}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Stack;
