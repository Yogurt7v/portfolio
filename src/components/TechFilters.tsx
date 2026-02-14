import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechFiltersProps {
  allTechs: string[];
  selectedTechs: string[];
  onToggle: (tech: string) => void;
  bestFilter: () => void;
  isBestMode: boolean;
  onClear: () => void;
}

const getTechFrequencies = (techs: string[]) => {
  const freq: Record<string, number> = {};
  techs.forEach((tech) => {
    freq[tech] = (freq[tech] || 0) + 1;
  });
  return freq;
};

// Исправлено: адаптивные размеры шрифтов и падингов
const sizeClasses = {
  small: 'px-2 py-1 text-xs sm:text-sm',
  medium: 'px-3 py-1.5 text-sm sm:text-base',
  large: 'px-4 py-2 text-sm sm:text-lg',
};

const TechFilters: React.FC<TechFiltersProps> = ({
  isBestMode,
  bestFilter,
  allTechs,
  selectedTechs,
  onToggle,
  onClear,
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const techFrequencies = useMemo(() => getTechFrequencies(allTechs), [allTechs]);
  const uniqueTechs = useMemo(() => [...new Set(allTechs)].sort(), [allTechs]);

  const getSizeClass = (tech: string): keyof typeof sizeClasses => {
    const count = techFrequencies[tech];
    if (count >= 5) return 'large';
    if (count >= 2) return 'medium';
    return 'small';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // Уменьшил y для более мягкого появления на мобилках
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full"
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10
                   rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none -z-10"
      />

      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 mb-8
                   bg-linear-to-r from-slate-900/60 via-slate-800/30 to-slate-900/60
                   backdrop-blur-2xl border border-white/10
                   rounded-[2rem] shadow-2xl shadow-black/50
                   relative overflow-hidden group"
      >
        {/* 🔥 Кнопка "Лучшее" */}
        <div className="flex shrink-0">
          <motion.button
            onClick={bestFilter}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border font-bold text-xs sm:text-sm
                    transition-all duration-300 overflow-hidden shrink-0
                    ${
                      isBestMode
                        ? 'bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-600 border-yellow-400/50 text-white shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-yellow-500/30 hover:text-white'
                    }`}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>⭐</span> <span className="whitespace-nowrap">Лучшее</span>
            </span>
          </motion.button>
        </div>

        {/* Технологии */}
        {uniqueTechs.map((tech) => {
          const size = getSizeClass(tech);
          const isSelected = selectedTechs.includes(tech);

          return (
            <motion.button
              key={tech}
              onClick={() => onToggle(tech)}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredTech(tech)}
              onHoverEnd={() => setHoveredTech(null)}
              className={`relative rounded-xl border font-medium 
                        transition-all duration-300 overflow-hidden shrink-0
                        ${sizeClasses[size]}
                        ${
                          isSelected
                            ? 'bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 border-blue-400/50 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/30 hover:text-white'
                        }`}
            >
              {/* Внутренний блик */}
              <div
                className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent 
                           transition-opacity duration-300 pointer-events-none
                           ${hoveredTech === tech && !isSelected ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: `translateX(${hoveredTech === tech ? '100%' : '-100%'})`,
                  transition: 'transform 0.6s ease-out',
                }}
              />

              {/* Голограммный бордер */}
              {hoveredTech === tech && !isSelected && (
                <div className="absolute inset-0 rounded-xl opacity-100 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-pulse" />
                  <div className="absolute inset-0.5 rounded-lg bg-slate-900/90" />
                </div>
              )}

              <span className="relative z-10 whitespace-nowrap">{tech}</span>
            </motion.button>
          );
        })}
        {/* Кнопка сброса */}
        <AnimatePresence>
          {selectedTechs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className="relative px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold 
                         bg-linear-to-r from-rose-500 via-rose-600 to-pink-600
                         text-white rounded-xl border border-rose-400/50
                         shadow-[0_0_25px_rgba(248,113,113,0.4)]
                         overflow-hidden group/clear"
              >
                <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                  <span>✕</span> Сбросить ({selectedTechs.length})
                </span>

                <div className="absolute inset-0 rounded-xl opacity-0 group-hover/clear:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-r from-rose-400 via-pink-400 to-purple-400 opacity-30" />
                  <div className="absolute inset-0.5 rounded-lg bg-linear-to-r from-rose-500 via-rose-600 to-pink-600" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TechFilters;
