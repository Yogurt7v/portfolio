import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TIMER_CHANGE_CARD } from './Portfolio';

const ProjectCard: React.FC<any> = ({ project, isActive, open, isAutoPlaying }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % project.screenshots.length);
    }, TIMER_CHANGE_CARD / 3);
    return () => clearInterval(interval);
  }, [isActive, project.screenshots.length]);

  return (
    <motion.div
      layout
      className={`group relative flex flex-col w-full h-full bg-slate-800/40 backdrop-blur-md border rounded-4xl overflow-hidden transition-all duration-500 shadow-xl ${
        isActive ? 'border-blue-500/50 shadow-blue-500/10' : 'border-white/5 opacity-80'
      }`}
      style={{ minHeight: '480px' }}
    >
      {/* Изображение проекта */}
      <div
        className="aspect-video relative overflow-hidden shrink-0 bg-slate-950 cursor-zoom-in group/img hover:scale-105  hover:blur-[2px] duration-[0.8s]"
        onClick={() => open(project)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={project.screenshots[currentImg]}
            className="w-full h-full object-cover"
            initial={{ opacity: 0.1, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Полоска прогресса для активного слайда */}
        {isActive && isAutoPlaying && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-blue-500 to-cyan-400 z-10"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: TIMER_CHANGE_CARD / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* Текстовый блок */}
      <div className="p-6 sm:p-8 flex flex-col grow">
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-xl font-bold leading-tight transition-colors ${
              isActive ? 'text-blue-400' : 'text-white'
            }`}
          >
            {project.title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Стек технологий */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech: any) => (
            <span
              key={tech.name}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
