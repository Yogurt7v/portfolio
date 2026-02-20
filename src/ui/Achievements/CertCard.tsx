import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import type { Certificate } from '../../types/certificate';
import { useMobile } from '../../hooks/useMobile';
import { certCardVariants } from '../../utils/animations';

interface CertCardProps {
  cert: Certificate;
  onSelect: (cert: Certificate) => void;
  custom: number;
}

const CertCard: React.FC<CertCardProps> = memo(({ cert, onSelect, custom }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMobile();

  return (
    <motion.div
      layoutId={`cert-container-${cert.id}`}
      onClick={() => onSelect(cert)}
      className="group relative aspect-3/4 sm:aspect-4/3 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900 shadow-lg"
      variants={certCardVariants}
      custom={custom}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Изображение */}
      <motion.img
        layoutId={`cert-img-${cert.id}`}
        src={cert.preview}
        alt={cert.name}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      />

      {/* Оверлей с информацией */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-3 sm:p-4 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ opacity: isMobile ? 1 : undefined }}
      >
        <span className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">
          {cert.issuer}
        </span>
        <p className="text-white text-[11px] sm:text-sm font-medium leading-tight line-clamp-2">
          {cert.name}
        </p>
      </motion.div>
    </motion.div>
  );
});

export default CertCard;
