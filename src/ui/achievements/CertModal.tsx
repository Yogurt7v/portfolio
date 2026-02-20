import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Certificate } from '../../types/certificate';

interface CertModalProps {
  cert: Certificate | null;
  onClose: () => void;
}

const CertModal: React.FC<CertModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Затемнённый фон */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
        />

        {/* Модальное окно с layout-анимацией от карточки */}
        <motion.div
          layoutId={`cert-container-${cert.id}`}
          className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Кнопка закрытия с собственной анимацией */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full backdrop-blur-xl border border-white/20 hover:bg-black/60 hover:text-black transition-all"
          >
            ✕
          </motion.button>

          {/* Область изображения */}
          <div className="p-1 bg-black/40 flex items-center justify-center min-h-50">
            <motion.img
              layoutId={`cert-img-${cert.id}`}
              src={cert.source}
              alt={cert.name}
              className="w-full h-auto max-h-[65vh] sm:max-h-[75vh] object-contain"
            />
          </div>

          {/* Текстовая информация (появляется с задержкой) */}
          <div className="p-6 sm:p-10 bg-linear-to-b from-slate-900 to-slate-950">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                {cert.issuer}
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {cert.name}
              </h3>
              {cert.date && (
                <p className="text-slate-500 font-medium text-sm">Выдан: {cert.date}</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CertModal;
