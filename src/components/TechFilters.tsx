import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechFiltersProps {
  allTechs: string[];
  selectedTechs: string[];
  onToggle: (tech: string) => void;
  onClear: () => void;
}

const TechFilters: React.FC<TechFiltersProps> = ({
  allTechs,
  selectedTechs,
  onToggle,
  onClear,
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="relative ">
      {/* Фоновый градиентный блик */}
      <div
        className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
                     rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                     pointer-events-none -z-10"
      />

      <div
        className="flex flex-wrap items-center justify-center gap-3 mb-12 p-6 
                     bg-linear-to-r from-slate-900/60 via-slate-800/30 to-slate-900/60
                     backdrop-blur-2xl border border-white/10 
                     rounded-3xl shadow-2xl shadow-black/50
                     relative overflow-hidden group"
      >
        {/* Технологии */}
        {allTechs.sort().map((tech) => (
          <motion.button
            key={tech}
            onClick={() => onToggle(tech)}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredTech(tech)}
            onHoverEnd={() => setHoveredTech(null)}
            className={`relative px-4 py-2.5 rounded-xl border text-sm font-medium 
                      transition-all duration-300 overflow-hidden
                      ${
                        selectedTechs.includes(tech)
                          ? 'bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 border-blue-400/50 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/30 hover:text-white'
                      }`}
          >
            {/* Внутренний блик при наведении */}
            <div
              className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent 
                         transition-opacity duration-300 pointer-events-none
                         ${hoveredTech === tech && !selectedTechs.includes(tech) ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `translateX(${hoveredTech === tech ? '100%' : '-100%'})`,
                transition: 'transform 0.6s ease-out',
              }}
            />

            {/* Голограммный бордер при наведении */}
            {hoveredTech === tech && !selectedTechs.includes(tech) && (
              <div className="absolute inset-0 rounded-xl opacity-100 pointer-events-none">
                <div className="absolute inset-0 bbg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-border-pulse" />
                <div className="absolute inset-0.5 rounded-lg bg-slate-900/90" />
              </div>
            )}

            <span className="relative z-10">{tech}</span>
          </motion.button>
        ))}

        {/* Кнопка сброса с анимацией */}
        <AnimatePresence>
          {selectedTechs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="ml-auto"
            >
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClear}
                className="relative px-5 py-2.5 text-sm font-bold 
                         bg-linear-to-r from-rose-500 via-rose-600 to-pink-600
                         text-white rounded-xl border border-rose-400/50
                         shadow-[0_0_25px_rgba(248,113,113,0.4)]
                         overflow-hidden group/clear"
              >
                {/* Блик на кнопке */}
                <div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent 
                               opacity-0 group-hover/clear:opacity-100 transition-opacity duration-300
                               animate-shimmer"
                />

                <span className="relative z-10 flex items-center gap-2">
                  <span>✕</span> Сбросить ({selectedTechs.length})
                </span>

                {/* Подсветка краев */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover/clear:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-r from-rose-400 via-pink-400 to-purple-400 opacity-30" />
                  <div className="absolute inset-0.5 rounded-lg bg-linear-to-r from-rose-500 via-rose-600 to-pink-600" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechFilters;
