import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_PER_STEP } from '../utils/constants';
import ProjectCard from './ProjectCard';
import TechFilters from './TechFilters';
import Modal from './Modal';

interface Tech {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: Tech[];
  rating?: number;
  screenshots: string[];
  category: string;
  videoUrl?: string;
  gitHubLink?: string;
  link?: string;
}

interface Props {
  projects: Project[];
}

const Portfolio: React.FC<Props> = ({ projects }) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_STEP);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

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

  const handleClearFilters = () => setSelectedTechs([]);

  return (
    <section id="projects" className="py-8 max-w-6xl mx-auto px-4">
      <TechFilters
        allTechs={allTechs}
        selectedTechs={selectedTechs}
        onToggle={toggleTech}
        onClear={handleClearFilters}
      />

      {/* Сетка проектов с анимацией */}
      <motion.div layout className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects
            // .sort((a, b) => b.id - a.id)
            .map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={(p) => setPreviewProject(p)}
                onHoverOpen={(p) => setPreviewProject(p)}
              />
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Видео-превью Модалка */}
      <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />

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
