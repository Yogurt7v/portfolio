import React from 'react';
import { motion } from 'framer-motion';
import { getSkillColor } from '../data/skills';
import { skills } from '../data/skills';

// Варианты анимации для контейнера (родителя)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // задержка между появлениями дочерних элементов
    },
  },
};

// Варианты для каждого элемента (скилла)
const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 5,
    transition: {
      type: 'spring', // пружинная анимация
      damping: 12, // «жесткость» пружины
      stiffness: 200, // упругость
    },
  },
};

const Skills: React.FC = () => {
  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center italic uppercase">
        Stack
        <span className="text-blue-500">.</span>
      </h2>

      {/* Контейнер с сеткой, управляющий анимацией дочерних элементов */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // сработает, когда 20% секции видно
      >
        {skills.map((skill, i) => (
          <motion.div
            key={`${skill.name}-${i}`}
            variants={itemVariants}
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
      </motion.div>
    </section>
  );
};

export default Skills;
