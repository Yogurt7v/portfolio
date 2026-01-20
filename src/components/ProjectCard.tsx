import React from 'react';
import { motion } from 'framer-motion';

interface Tech {
  name: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: Tech[];
  screenshots: string[];
  category: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer bg-glass-white backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500 shadow-xl"
    >
      {/* Контейнер изображения */}
      <div className="aspect-video bg-slate-800 overflow-hidden relative">
        <img
          src={project.screenshots[0]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Оверлей при наведении (Glassmorphism эффект) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-6 py-2 bg-white text-black rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Подробнее
          </span>
        </div>
      </div>

      {/* Контентная часть */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
            {project.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Стек технологий */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-md"
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
