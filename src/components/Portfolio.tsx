import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_PER_STEP } from '../utils/constants';
import ProjectCard from './ProjectCard';
import TechFilters from './TechFilters';
import Modal from './Modal';
import Loader from './Loader';

interface Tech {
  name: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  techStack: Tech[];
  rating?: number;
  screenshots: string[];
  videoUrl?: string;
  gitHubLink?: string;
  link?: string;
  isFeatured: boolean;
}

interface Props {
  projects: Project[];
}

const Portfolio: React.FC<Props> = ({ projects }) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Получаем список всех уникальных технологий
  const allTechs = useMemo(() => {
    if (!projects?.length) return [];
    return Array.from(
      new Set(projects.flatMap((item) => item.techStack.map((tech) => tech.name))),
    );
  }, [projects]);

  // Фильтрация проектов
  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return projects;
    return projects.filter((project) =>
      project.techStack.some((tech) => selectedTechs.includes(tech.name)),
    );
  }, [selectedTechs, projects]);

  // Автопрокрутка слайдера
  useEffect(() => {
    if (!isAutoPlaying || filteredProjects.length <= 1) return;

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
    };

    autoPlayRef.current = setInterval(nextSlide, 5000); // Прокрутка каждые 5 секунд

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredProjects.length]);

  // Обработчик начала перетаскивания
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setDragStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    setIsAutoPlaying(false);
  }, []);

  // Обработчик перемещения мыши при перетаскивании
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - dragStartX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, dragStartX, scrollLeft],
  );

  // Обработчик окончания перетаскивания
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }

    // Возобновляем автопрокрутку через 3 секунды после перетаскивания
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  }, []);

  // Обработчик клика по индикатору
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);

    // Возобновляем автопрокрутку через 3 секунды после ручного переключения
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  }, []);

  // Прокрутка к текущему слайду
  useEffect(() => {
    if (!sliderRef.current || filteredProjects.length === 0) return;

    const cardWidth = 410; // Ширина карточки + отступы
    const scrollPosition = currentSlide * cardWidth;

    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [currentSlide, filteredProjects.length]);

  // Обработчики фильтров
  const toggleTech = useCallback((tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((item) => item !== tech) : [...prev, tech],
    );
    setCurrentSlide(0); // Сброс к первому слайду при изменении фильтров
    setIsAutoPlaying(true);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedTechs([]);
    setCurrentSlide(0);
    setIsAutoPlaying(true);
  }, []);

  // Кнопки навигации
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
    setIsAutoPlaying(false);

    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  }, [filteredProjects.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
    setIsAutoPlaying(false);

    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  }, [filteredProjects.length]);

  // Очистка таймеров при размонтировании
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="py-12 max-w-5xl mx-auto px-4">
      {/* Контейнер горизонтального слайдера */}
      <div className="relative">
        {/* Кнопки навигации */}
        {filteredProjects.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 bg-linear-to-r from-slate-900/90 to-transparent hover:from-slate-800/90 text-white rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Предыдущий проект"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 bg-linear-to-l from-slate-900/90 to-transparent hover:from-slate-800/90 text-white rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Следующий проект"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Горизонтальный слайдер */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-8 px-5 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="shrink-0 w-100 mx-4 snap-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0.6,
                y: 0,
                scale: index === currentSlide ? 1.02 : 0.98,
              }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                isActive={index === currentSlide}
                onClick={(p) => setPreviewProject(p)}
                onHoverOpen={(p) => setPreviewProject(p)}
              />
            </motion.div>
          ))}

          {/* Пустой элемент для правильного отступа в конце */}
          <div className="shrink-0 w-4" />
        </div>

        {/* Индикаторы слайдов */}
        {filteredProjects.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Перейти к проекту ${index + 1}`}
              >
                {/* Фоновая точка */}
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-500'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />

                {/* Анимация для текущего слайда */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Индикатор автопрокрутки */}
                {index === currentSlide && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-blue-300"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* <h2 className="text-3xl font-bold text-white mb-2">
            Проекты
            <span className="ml-2 text-blue-400">({filteredProjects.length})</span>
          </h2> */}
            <p className="text-slate-400 text-sm">
              {isAutoPlaying ? 'Автопрокрутка включена' : 'Автопрокрутка приостановлена'}
            </p>
          </div>

          {/* Кнопки управления автопрокруткой */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-2"
          >
            {isAutoPlaying ? (
              <>
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-300">Пауза</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-300">Воспроизвести</span>
              </>
            )}
          </button>
        </div>
      </div>

      <TechFilters
        allTechs={allTechs}
        selectedTechs={selectedTechs}
        onToggle={toggleTech}
        onClear={handleClearFilters}
      />

      {/* Видео-превью Модалка */}
      <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
    </section>
  );
};

export default Portfolio;
