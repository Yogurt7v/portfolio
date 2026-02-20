import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  lazy,
} from 'react';
import { motion } from 'framer-motion';
const ProjectCard = lazy(() => import('./ProjectCard'));
import TechFilters from './TechFilters';
import Modal from './Modal';
import SkeletonCard from './SkeletonCard';
import { useMobile } from '../hooks/useMobile';
import { getProjects } from '../api/getProjects';
import { useSlideWidth } from '../hooks/useSlideWidth';

export const TIMER_CHANGE_CARD = 5000;

// Варианты анимации
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};

const filtersVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 15, stiffness: 300 },
  },
};

const sliderVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 200 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 250 },
  },
};

const Portfolio: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Динамическая загрузка данных
  const { projectsData, isProjectsLoading } = getProjects();

  const containerRef = useRef<HTMLDivElement>(null);
  const gap = 24;

  const isMobile = useMobile();
  const slideWidth = useSlideWidth(containerRef, isMobile, 410);
  const effectiveWidth = slideWidth + gap;

  // Мемоизация отфильтрованных проектов (используем projectsData)
  const filteredProjects = useMemo(() => {
    // Пока данные грузятся, возвращаем пустой массив, чтобы избежать ошибок
    if (isProjectsLoading) return [];

    if (selectedTechs.length > 0) {
      return projectsData.filter((p: Project) =>
        p.techStack.some((t) => selectedTechs.includes(t.name)),
      );
    }
    return isFeatured ? projectsData.filter((p: Project) => p.isFeatured) : projectsData;
  }, [selectedTechs, isFeatured, projectsData, isProjectsLoading]);

  const next = useCallback(
    () => setCurrentSlide((p) => (p + 1) % filteredProjects.length),
    [filteredProjects.length],
  );

  const prev = useCallback(
    () => setCurrentSlide((p) => (p === 0 ? filteredProjects.length - 1 : p - 1)),
    [filteredProjects.length],
  );

  // Автопереключение слайдов
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && !previewProject && filteredProjects.length > 0) {
      interval = setInterval(() => {
        next();
      }, TIMER_CHANGE_CARD);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, next, previewProject, filteredProjects.length]);

  // Если данные загружаются — показываем заглушки (например, несколько скелетонов)
  if (isProjectsLoading) {
    return (
      <section className="w-full py-12 max-w-6xl mx-auto px-4" id="projects">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="order-2 md:order-1">
            {/* Можно показать скелетон фильтров, но для простоты пропустим */}
            <div className="h-12 bg-slate-800/50 rounded-full animate-pulse" />
          </div>
          <div className="order-1 md:order-2 relative p-4 sm:p-8 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-4xl md:rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="flex gap-6 pb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="shrink-0" style={{ width: slideWidth }}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
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
        <motion.div
          ref={containerRef}
          className="order-1 md:order-2 relative p-4 sm:p-8 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-4xl md:rounded-[2.5rem] shadow-2xl overflow-hidden"
          variants={sliderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Кнопка Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors"
            title={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="md:w-5 md:h-5"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="md:w-5 md:h-5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Контейнер карточек */}
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing pb-8"
            drag="x"
            dragConstraints={{
              left: -(filteredProjects.length - 1) * effectiveWidth,
              right: 0,
            }}
            onDragStart={() => setIsAutoPlaying(false)}
            onDragEnd={(_, info) => {
              const threshold = isMobile ? 50 : slideWidth * 0.15;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
            }}
            animate={{ x: -currentSlide * effectiveWidth }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {filteredProjects.map((project, index) => (
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
                <Suspense fallback={<SkeletonCard />}>
                  <ProjectCard
                    project={project}
                    isActive={index === currentSlide}
                    open={setPreviewProject}
                    isAutoPlaying={isAutoPlaying}
                  />
                </Suspense>
              </motion.div>
            ))}
          </motion.div>

          {/* Индикаторы / кнопки навигации */}
          <div className="flex justify-center flex-wrap gap-2 mt-2 px-10">
            {isMobile ? (
              <>
                <button
                  onClick={() => {
                    prev();
                    setIsAutoPlaying(false);
                  }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>←</span> Prev
                </button>
                <button
                  onClick={() => {
                    next();
                    setIsAutoPlaying(false);
                  }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors flex items-center gap-1"
                >
                  Next <span>→</span>
                </button>
              </>
            ) : (
              filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 hover:cursor-pointer ${
                    i === currentSlide
                      ? 'bg-blue-500 w-6 md:w-18'
                      : 'bg-white/20 w-1.5 md:w-2'
                  }`}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>

      <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
    </motion.section>
  );
};

export default Portfolio;
