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
import { projects } from '../data/projects';
import Modal from './Modal';
import SkeletonCard from './SkeletonCard';

export type Project = {};

const Portfolio: React.FC = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(410);
  const gap = 24;

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.offsetWidth;
      if (window.innerWidth < 768) {
        setSlideWidth(parentWidth * 0.9);
      } else {
        setSlideWidth(410);
      }
    }
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [updateWidth]);

  const effectiveWidth = slideWidth + gap;

  const filteredProjects = useMemo(() => {
    if (selectedTechs.length > 0) {
      return projects.filter((p) =>
        p.techStack.some((t) => selectedTechs.includes(t.name)),
      );
    }
    return isFeatured ? projects.filter((p) => p.isFeatured) : projects;
  }, [selectedTechs, isFeatured]);

  const next = useCallback(
    () => setCurrentSlide((p) => (p + 1) % filteredProjects.length),
    [filteredProjects.length],
  );
  const prev = useCallback(
    () => setCurrentSlide((p) => (p === 0 ? filteredProjects.length - 1 : p - 1)),
    [filteredProjects.length],
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.5 }}
    >
      <section
        id="projects"
        className="py-12 max-w-6xl mx-auto w-full px-4 overflow-hidden"
      >
        {/* Обертка для смены порядка:
          На мобилках (flex-col) порядок будет 1 -> 2.
          Используя order-x, мы явно говорим, кто где стоит.
      */}
        <div className="flex flex-col gap-12">
          {/* ФИЛЬТРЫ: На мобильном order-2 (внизу), на десктопе md:order-1 (вверху) */}
          <div className="order-2 md:order-1">
            <TechFilters
              bestFilter={() => {
                setIsFeatured(!isFeatured);
                setSelectedTechs([]);
                setCurrentSlide(0);
              }}
              isBestMode={isFeatured}
              allTechs={Array.from(
                projects.flatMap((p) => p.techStack.map((t) => t.name)),
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
          </div>

          {/* СЛАЙДЕР: На мобильном order-1 (вверху), на десктопе md:order-2 (внизу) */}
          <div
            ref={containerRef}
            className="order-1 md:order-2 relative p-4 sm:p-8 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <motion.div
              className="flex gap-6 cursor-grab active:cursor-grabbing pb-8"
              drag="x"
              dragConstraints={{
                left: -(filteredProjects.length - 1) * effectiveWidth,
                right: 0,
              }}
              onDragEnd={(_, info) => {
                const threshold = slideWidth * 0.15;
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
                  animate={{
                    scale: index === currentSlide ? 1 : 0.9,
                    opacity: index === currentSlide ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Suspense fallback={<SkeletonCard />}>
                    <ProjectCard
                      project={project}
                      isActive={index === currentSlide}
                      onClick={setPreviewProject}
                    />
                  </Suspense>
                </motion.div>
              ))}
            </motion.div>

            {/* Пагинация (точки) */}
            <div className="flex justify-center gap-2 mt-2">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'bg-blue-500 w-8' : 'bg-white/20 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
      </section>
    </motion.div>
  );
};

export default Portfolio;
