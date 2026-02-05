import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';
import TechFilters from './TechFilters';
import Modal from './Modal';

interface Tech {
  name: string;
}

interface Props {
  projects: Project[];
}

const SLIDE_WIDTH = 410; // ширина карточки + gap (ОК оставить const)

const Portfolio: React.FC<Props> = ({ projects }) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const allTechs = useMemo(
    () => Array.from(projects.flatMap((p) => p.techStack.map((t) => t.name))),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    if (selectedTechs.length > 0) {
      return projects.filter((project) =>
        project.techStack.some((tech) => selectedTechs.includes(tech.name)),
      );
    }

    return isFeatured ? projects.filter((project) => project.isFeatured) : projects;
  }, [projects, selectedTechs, isFeatured]);

  useEffect(() => {
    if (!isAutoPlaying || filteredProjects.length <= 1) return;

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoPlaying, filteredProjects.length]);

  const next = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % filteredProjects.length);
    setIsAutoPlaying(true);
  }, [filteredProjects.length]);

  const prev = useCallback(() => {
    setCurrentSlide((p) => (p === 0 ? filteredProjects.length - 1 : p - 1));
    setIsAutoPlaying(true);
  }, [filteredProjects.length]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
    setCurrentSlide(0);
    // 🔥 При выборе технологии отключаем режим "Лучшее"
    if (isFeatured) {
      setIsFeatured(false);
    }
  };

  const toggleBestFilter = useCallback(() => {
    setIsFeatured((prev) => !prev);
    // 🔥 При переключении режима сбрасываем выбранные технологии
    setSelectedTechs([]);
    setCurrentSlide(0);
  }, [isFeatured]);

  return (
    <section id="projects" className="py-12 max-w-6xl mx-auto">
      {/* FILTERS */}
      <TechFilters
        bestFilter={toggleBestFilter}
        isBestMode={isFeatured}
        allTechs={allTechs}
        selectedTechs={selectedTechs}
        onToggle={toggleTech}
        onClear={() => setSelectedTechs([])}
      />

      {/* SLIDER */}
      <div
        className="relative overflow-hidden p-6 size-full bg-linear-to-r from-slate-900/60 via-slate-800/30 to-slate-900/60
                   backdrop-blur-2xl border border-white/10 
                   rounded-3xl shadow-2xl shadow-black/50
                   "
      >
        {/* TRACK */}

        <motion.div
          className="flex gap-6 cursor-grab active:cursor-grabbing pb-8"
          drag="x"
          dragConstraints={{
            left: -(filteredProjects.length - 1) * SLIDE_WIDTH,
            right: 0,
          }}
          onDragEnd={(_, info) => {
            const swipe = info.offset.x;

            if (swipe < -80) next();
            if (swipe > 80) prev();
          }}
          animate={{
            x: -currentSlide * SLIDE_WIDTH,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="shrink-0"
              style={{ width: SLIDE_WIDTH }}
              animate={{
                scale: index === currentSlide ? 1.0 : 0.85,
                opacity: index === currentSlide ? 1 : 0.5,
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
        </motion.div>

        {/* ARROWS */}
        {filteredProjects.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-5 text-2xl bg-slate-900/80 rounded-full"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-5 text-2xl bg-slate-900/80 rounded-full"
            >
              ›
            </button>
          </>
        )}
        {/* DOTS */}
        <div className="flex justify-center gap-2">
          {filteredProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentSlide(i);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition ${
                i === currentSlide ? 'bg-blue-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal previewProject={previewProject} setPreviewProject={setPreviewProject} />
    </section>
  );
};

export default Portfolio;
