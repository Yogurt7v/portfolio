import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../data/projects';
import { useMobile } from '../../hooks/useMobile';
import { useSlideWidth } from '../../hooks/useSlideWidth';
import { GAP, INITIAL_WIDTH } from '../../utils/constants';
import { useVisibleIndexes } from '../../hooks/useVisibleIndexes';
import { cardItemVariants, sliderVariants } from '../../utils/animations';
import SkeletonCard from './SkeletonCard';
import PlayPauseButton from './PlayPauseButton';
import SliderControls from './SliderControls';

const ProjectCard = React.lazy(() => import('../../components/ProjectCard'));

interface ProjectsSliderProps {
  projects: Project[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (value: boolean) => void;
  onOpenPreview: (project: Project) => void;
  previewProject?: Project | null;
}

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({
  projects,
  currentSlide,
  setCurrentSlide,
  isAutoPlaying,
  setIsAutoPlaying,
  onOpenPreview,
  previewProject,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobile();
  const slideWidth = useSlideWidth(containerRef, isMobile, INITIAL_WIDTH);
  const effectiveWidth = slideWidth + GAP;

  const visibleIndexes = useVisibleIndexes(currentSlide, projects.length);

  const next = () => {
    setCurrentSlide((currentSlide + 1) % projects.length);
  };

  const prev = () => {
    setCurrentSlide(currentSlide === 0 ? projects.length - 1 : currentSlide - 1);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = isMobile ? 50 : slideWidth * 0.15;
    if (info.offset.x < -threshold) {
      next();
    } else if (info.offset.x > threshold) {
      prev();
    }
  };

  const disableAutoPlay = () => setIsAutoPlaying(false);

  return (
    <motion.div
      ref={containerRef}
      className="order-1 md:order-2 relative p-4 sm:px-8 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-4xl md:rounded-[2.5rem] shadow-2xl overflow-hidden"
      variants={sliderVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <PlayPauseButton
        isAutoPlaying={isAutoPlaying}
        onToggle={() => setIsAutoPlaying(!isAutoPlaying)}
      />

      <motion.div
        className="flex cursor-grab active:cursor-grabbing pt-8"
        style={{ gap: GAP }}
        drag="x"
        dragConstraints={{
          left: -(projects.length - 1) * effectiveWidth,
          right: 0,
        }}
        onDragStart={disableAutoPlay}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentSlide * (slideWidth + GAP) }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="shrink-0"
            style={{ width: slideWidth }}
            variants={cardItemVariants}
            animate={{
              scale: index === currentSlide ? 1 : isMobile ? 0.95 : 0.9,
              opacity: index === currentSlide ? 1 : 0.6,
            }}
            transition={{ duration: 0.4 }}
          >
            {visibleIndexes.has(index) ? (
              <Suspense fallback={<SkeletonCard />}>
                <ProjectCard
                  project={project}
                  isActive={index === currentSlide}
                  open={onOpenPreview}
                  isAutoPlaying={isAutoPlaying}
                />
              </Suspense>
            ) : (
              <SkeletonCard />
            )}
          </motion.div>
        ))}
      </motion.div>

      <SliderControls
        totalSlides={projects.length}
        currentSlide={currentSlide}
        onPrev={prev}
        onNext={next}
        onDotClick={setCurrentSlide}
        disableAutoPlay={disableAutoPlay}
      />
    </motion.div>
  );
};

export default ProjectsSlider;
