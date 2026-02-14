import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/certificates';

export interface Certificate {
  id: number;
  name: string;
  source: string;
  issuer?: string;
  date?: string;
}

const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [selectedCert]);

  return (
    <section className="py-12 sm:py-24 px-4 max-w-6xl mx-auto" id="achievements">
      <div className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
          Certificates<span className="text-blue-500">.</span>
        </h2>
        <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
      </div>

      {/* Сетка: 2 колонки на мобилках, 3 на планшетах, 5 на десктопе */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            layoutId={`cert-container-${cert.id}`}
            onClick={() => setSelectedCert(cert)}
            className="group relative aspect-[3/4] sm:aspect-4/3 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900 shadow-lg"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.img
              layoutId={`cert-img-${cert.id}`}
              src={cert.source}
              alt={cert.name}
              className="w-full h-full object-cover"
            />

            {/* Оверлей: на мобилках деликатный градиент всегда, на десктопе - при ховере */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 p-3 sm:p-4 flex flex-col justify-end">
              <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
                {cert.issuer}
              </span>
              <p className="text-white text-[11px] sm:text-sm font-medium leading-tight line-clamp-2">
                {cert.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
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
              {/* Кнопка закрытия */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/10 text-white rounded-full backdrop-blur-xl border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                ✕
              </button>

              <div className="p-1 bg-black/40 flex items-center justify-center">
                <motion.img
                  layoutId={`cert-img-${selectedCert.id}`}
                  src={selectedCert.source}
                  alt={selectedCert.name}
                  className="w-full h-auto max-h-[65vh] sm:max-h-[75vh] object-contain"
                />
              </div>

              <div className="p-6 sm:p-10 bg-linear-to-b from-slate-900 to-slate-950">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                      {selectedCert.issuer || 'Официальный сертификат'}
                    </span>
                    <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                      {selectedCert.name}
                    </h3>
                    {selectedCert.date && (
                      <p className="text-slate-500 font-medium text-sm">
                        Выдан: {selectedCert.date}
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
