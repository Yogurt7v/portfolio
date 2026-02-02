import React, { useState } from 'react';
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

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto" id="achievements">
      <h2 className="text-4xl font-bold mb-16 text-center italic uppercase">
        Certificates <span className="text-blue-500">.</span>
      </h2>

      {/* Сетка галереи */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            layoutId={`cert-${cert.id}`}
            onClick={() => setSelectedCert(cert)}
            className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
            whileHover={{ y: -5 }}
          >
            <img
              src={cert.source}
              alt={cert.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Оверлей при наведении */}
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white text-xs font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full">
                Просмотр
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Фон-затемнение */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Контент модалки */}
            <motion.div
              layoutId={`cert-${selectedCert.id}`}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>

              <img
                src={selectedCert.source}
                alt={selectedCert.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <div className="p-6 bg-slate-800/50 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white">{selectedCert.name}</h3>
                <p className="text-blue-400 text-sm">{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
