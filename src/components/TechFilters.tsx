import React from 'react';
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
  return (
    <div className="flex flex-wrap items-center gap-3 mb-12 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
      {allTechs.map((tech) => (
        <button
          key={tech}
          onClick={() => onToggle(tech)}
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${
            selectedTechs.includes(tech)
              ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-105'
              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
          }`}
        >
          {tech}
        </button>
      ))}

      {/* Кнопка сброса с анимацией */}
      <AnimatePresence>
        {selectedTechs.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={onClear}
            className="ml-auto px-4 py-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2"
          >
            <span>✕</span> Сбросить
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechFilters;
