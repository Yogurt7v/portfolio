import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import TechFilters from './TechFilters';
import Modal from './Modal';
import { getProjects } from '../api/getProjects';
import type { Project } from '../data/projects';
import { useAutoPlay } from '../hooks/useAutoPlay';
import ProjectsSkeleton from '../ui/portfolio/ProjectsSkeleton';
import { filtersVariants, sectionVariants } from '../utils/animations';
import ProjectsSlider from '../ui/portfolio/ProjectsSlider';

const Portfolio: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const { projectsData, isProjectsLoading } = getProjects();

  // Мемоизация отфильтрованных проектов
  const filteredProjects = useMemo(() => {
    if (isProjectsLoading) return [];

    if (selectedTechs.length > 0) {
      return projectsData.filter((p: Project) =>
        p.techStack.some((t) => selectedTechs.includes(t.name)),
      );
    }
    return isFeatured ? projectsData.filter((p: Project) => p.isFeatured) : projectsData;
  }, [selectedTechs, isFeatured, projectsData, isProjectsLoading]);

  // Сброс слайда при изменении фильтров
  useEffect(() => {
    setCurrentSlide(0);
  }, [filteredProjects]);

  // Автопереключение
  const next = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % filteredProjects.length);
  }, [filteredProjects.length]);

  useAutoPlay(isAutoPlaying, !!previewProject, filteredProjects.length, next);

  // Показать скелетон во время загрузки
  if (isProjectsLoading) {
    return <ProjectsSkeleton slideWidth={410} />;
  }

  return (
    <motion.section
      className="w-full overflow-hidden py-12 max-w-6xl mx-auto px-4"
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Фильтры */}
        <motion.div className="order-2 md:order-1" variants={filtersVariants}>
          <TechFilters
            bestFilter={() => {
              setIsFeatured(!isFeatured);
              setSelectedTechs([]);
              setCurrentSlide(0);
            }}
            isBestMode={isFeatured}
            allTechs={Array.from(
              new Set(
                projectsData.flatMap((p: Project) => p.techStack.map((t) => t.name)),
              ),
            )}
            selectedTechs={selectedTechs}
            onToggle={(tech) => {
              setSelectedTechs((prev) =>
                prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
              );
              setIsFeatured(false);
              setCurrentSlide(0);
            }}
            onClear={() => setSelectedTechs([])}
          />
        </motion.div>

        {/* Слайдер */}
        <ProjectsSlider
          projects={filteredProjects}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAutoPlaying={isAutoPlaying}
          setIsAutoPlaying={setIsAutoPlaying}
          openPreview={setPreviewProject}
        />
      </div>

      <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
    </motion.section>
  );
};

export default Portfolio;
