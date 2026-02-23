import { useCallback, useMemo, useState } from 'react';
import { useAutoPlay } from '../hooks/useAutoPlay';
import ProjectsSlider from '../ui/Portfolio/ProjectsSlider';
import { filtersVariants, sectionVariants } from '../utils/animations';
import { INITIAL_WIDTH } from '../utils/constants';
import Modal from './Modal';
import ProjectsSkeleton from './ProjectsSkeleton';
import TechFilters from './TechFilters';
import type { Project } from '../data/projects';
import { getProjects } from '../api/getProjects';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const { projectsData, isProjectsLoading } = getProjects();

  const allTechs = useMemo(() => {
    if (!projectsData) return [];
    const techs = new Set<string>();
    projectsData.forEach((p) => p.techStack.forEach((t) => techs.add(t.name)));
    return Array.from(techs);
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    if (isProjectsLoading || !projectsData) return [];

    let result = projectsData;
    if (selectedTechs.length > 0) {
      result = result.filter((p: Project) =>
        p.techStack.some((t) => selectedTechs.includes(t.name)),
      );
    } else if (isFeatured) {
      result = result.filter((p: Project) => p.isFeatured);
    }
    return result;
  }, [selectedTechs, isFeatured, projectsData, isProjectsLoading]);

  const handleToggleTech = useCallback((tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
    setIsFeatured(false);
    setCurrentSlide(0);
  }, []);

  const handleBestFilter = useCallback(() => {
    setIsFeatured((prev) => !prev);
    setSelectedTechs([]);
    setCurrentSlide(0);
  }, []);

  const next = useCallback(() => {
    if (filteredProjects.length > 0) {
      setCurrentSlide((p) => (p + 1) % filteredProjects.length);
    }
  }, [filteredProjects.length]);

  useAutoPlay(isAutoPlaying, !!previewProject, filteredProjects.length, next);

  if (isProjectsLoading) return <ProjectsSkeleton slideWidth={INITIAL_WIDTH} />;

  return (
    <motion.section
      className="w-full overflow-hidden py-12 max-w-6xl mx-auto px-4"
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Уменьшили amount для более раннего старта
      variants={sectionVariants}
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <motion.div className="order-2 md:order-1" variants={filtersVariants}>
          <TechFilters
            bestFilter={handleBestFilter}
            isBestMode={isFeatured}
            allTechs={allTechs}
            selectedTechs={selectedTechs}
            onToggle={handleToggleTech}
            onClear={() => setSelectedTechs([])}
          />
        </motion.div>

        <ProjectsSlider
          projects={filteredProjects}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          isAutoPlaying={isAutoPlaying}
          setIsAutoPlaying={setIsAutoPlaying}
          onOpenPreview={setPreviewProject}
        />
      </div>

      {/* Рендерим модалку только когда она нужна */}
      {previewProject && (
        <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
      )}
    </motion.section>
  );
};

export default Portfolio;
