import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMAGE_INTERVAL, MOUSE_TIMER } from '../utils/constants';

interface Tech {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  screenshots: string[];
  videoUrl?: string;
  techStack: Tech[];
  isFeatured: boolean;
  gitHubLink?: string;
  link?: string;
}

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: (project: Project) => void;
  // onHoverOpen: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive,
  onClick,
  // onHoverOpen,
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Смена скриншотов только для активной карточки
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % project.screenshots.length);
    }, IMAGE_INTERVAL);

    return () => clearInterval(interval);
  }, [isActive, project.screenshots.length]);

  // const handleMouseEnter = () => {
  //   hoverTimer.current = setTimeout(() => {
  //     onHoverOpen(project);
  //   }, MOUSE_TIMER);
  // };

  // const handleMouseLeave = () => {
  //   if (hoverTimer.current) clearTimeout(hoverTimer.current);
  // };

  return (
    <motion.div
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1 : 0.95,
        borderColor: isActive ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      className={`group cursor-pointer bg-glass-white backdrop-blur-md border rounded-3xl overflow-hidden transition-all duration-500 shadow-xl ${
        isActive ? 'shadow-blue-500/20 hover:shadow-blue-500/30' : 'hover:shadow-white/10'
      }`}
      style={{
        height: '550px', // Фиксированная высота для всех карточек
      }}
    >
      {/* Активный индикатор */}
      {isActive && (
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="px-3 py-1 bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>Текущий</span>
          </div>
        </motion.div>
      )}

      {/* Изображение проекта */}
      <div className="aspect-video relative overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={project.screenshots[currentImg]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Индикатор прогресса для активной карточки */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        )}
      </div>

      {/* Контентная часть */}
      <div className="p-6 h-85 flex flex-col">
        {/* Заголовок */}
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-xl font-bold transition-colors ${
              isActive
                ? 'text-blue-400 group-hover:text-blue-300'
                : 'text-white group-hover:text-blue-400'
            }`}
          >
            {project.title}
          </h3>

          {/* Категория */}
          {/* <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
            {project.category}
          </span> */}
        </div>

        {/* Описание */}
        <p className="text-slate-400 text-sm mb-6 line-clamp-4 leading-relaxed grow">
          {project.description}
        </p>

        {/* Технологии */}
        <div className="flex flex-wrap gap-2 mt-auto pb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm transition-all ${
                isActive
                  ? 'bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}
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
