import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificates } from '../data/certificate'; // предполагаемый путь
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import type { Certificate } from '../types/certificate';
import CertCard from '../ui/achievements/CertCard';
import CertModal from '../ui/achievements/CertModal';

// Анимация для контейнера с карточками (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Блокируем скролл при открытой модалке
  useLockBodyScroll(!!selectedCert);

  const handleSelectCert = (cert: Certificate) => setSelectedCert(cert);
  const handleCloseModal = () => setSelectedCert(null);

  return (
    <motion.section
      id="achievements"
      className="py-12 sm:py-24 px-4 max-w-6xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Заголовок */}
      <div className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
          Мои сертификаты<span className="text-blue-500">.</span>
        </h2>
        <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
      </div>

      {/* Сетка карточек с анимацией stagger */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6"
        variants={containerVariants}
      >
        {certificates.map((cert: Certificate) => (
          <CertCard key={cert.id} cert={cert} onSelect={handleSelectCert} />
        ))}
      </motion.div>

      {/* Модальное окно */}
      <CertModal cert={selectedCert} onClose={handleCloseModal} />

      {/* Стили для анимации shimmer (можно вынести в глобальный CSS) */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background-size: 200% 100%;
        }
      `}</style>
    </motion.section>
  );
};

export default Achievements;
