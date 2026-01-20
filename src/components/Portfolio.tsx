import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_PER_STEP } from '../utils/constants';

interface Tech {
  name: string;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: Tech[];
  rating?: number;
  screenshots: string[];
  category: string;
}

interface Props {
  projects: Project[];
}

const Portfolio: React.FC<Props> = ({ projects }) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_STEP);

  const lastOneRef = useRef<HTMLDivElement>(null);

  //Получаем список всех уникальных технологий
  const allTechs = useMemo(() => {
    if (!projects?.length) return [];
    return Array.from(
      new Set(projects.flatMap((item) => item.techStack.map((tech) => tech.name))),
    );
  }, [projects]);

  // Фильтрация
  const filteredProjects = useMemo(() => {
    setVisibleCount(PROJECTS_PER_STEP);

    if (selectedTechs.length === 0) return projects;

    return projects.filter((project) =>
      project.techStack.some((tech) => selectedTechs.includes(tech.name)),
    );
  }, [selectedTechs, projects]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleCount < filteredProjects.length) {
          setVisibleCount((prev) => prev + PROJECTS_PER_STEP);
        }
      },
      { threshold: 1.0 },
    );

    if (lastOneRef.current) {
      observer.observe(lastOneRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredProjects.length]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech],
    );
  };

  return (
    <section>
      {/* Панель фильтров с эффектом стекла */}
      <div className="flex flex-wrap gap-4 mb-12 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => toggleTech(tech)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedTechs.includes(tech)
                ? 'bg-blue-500 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Сетка проектов с анимацией */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-glass-white backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors group"
            >
              <div className="aspect-video bg-slate-800 overflow-hidden relative">
                <img
                  src={project.screenshots[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span key={t.name} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {visibleCount < filteredProjects.length && (
        <div ref={lastOneRef} className="h-20 flex items-center justify-center mt-10">
          {/* Можно добавить лоадер/спиннер */}
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
