import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/certificate';

// Вспомогательный компонент карточки для изоляции лоадера
const CertCard = memo(({ cert, onSelect }: { cert: any; onSelect: (c: any) => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layoutId={`cert-container-${cert.id}`}
      onClick={() => onSelect(cert)}
      className="group relative aspect-3/4 sm:aspect-4/3 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900 shadow-lg"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Лоадер / Скелетон */}
      {/* {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-slate-800 flex items-center justify-center">
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
      )} */}

      <motion.img
        layoutId={`cert-img-${cert.id}`}
        src={cert.preview} // Сразу рисуем миниатюру
        alt={cert.name}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 p-3 sm:p-4 flex flex-col justify-end">
        <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
          {cert.issuer}
        </span>
        <p className="text-white text-[11px] sm:text-sm font-medium leading-tight line-clamp-2">
          {cert.name}
        </p>
      </div>
    </motion.div>
  );
});

const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : 'auto';
  }, [selectedCert]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-12 sm:py-24 px-4 max-w-6xl mx-auto" id="achievements">
        <div className="flex flex-col items-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
            Мои сертификаты<span className="text-blue-500">.</span>
          </h2>
          <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} onSelect={setSelectedCert} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedCert && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
              />

              <motion.div
                layoutId={`cert-container-${selectedCert.id}`}
                className="relative w-full max-w-4xl bg-slate-900 rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/10 text-black rounded-full backdrop-blur-xl border border-black hover:bg-white hover:text-black transition-all"
                >
                  ✕
                </button>

                <div className="p-1 bg-black/40 flex items-center justify-center min-h-[200px]">
                  <motion.img
                    loading="lazy"
                    layoutId={`cert-img-${selectedCert.id}`}
                    src={selectedCert.source} // В модалке грузим нормальное изображение
                    alt={selectedCert.name}
                    className="w-full h-auto max-h-[65vh] sm:max-h-[75vh] object-contain"
                  />
                </div>

                <div className="p-6 sm:p-10 bg-linear-to-b from-slate-900 to-slate-950">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                      {selectedCert.issuer || 'В процессе обучения'}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm">
                      {selectedCert.date ? `Выдан: ${selectedCert.date}` : 'Ожидается'}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </motion.div>
  );
};

export default Achievements;
