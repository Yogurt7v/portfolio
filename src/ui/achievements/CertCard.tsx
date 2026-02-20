import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import type { Certificate } from '../../types/certificate';
import { useMobile } from '../../hooks/useMobile';

// Анимация для карточки при появлении (используется в Achievements)
export const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CertCardProps {
  cert: Certificate;
  onSelect: (cert: Certificate) => void;
}

const CertCard: React.FC<CertCardProps> = memo(({ cert, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useMobile();

  return (
    <motion.div
      layoutId={`cert-container-${cert.id}`}
      onClick={() => onSelect(cert)}
      className="group relative aspect-3/4 sm:aspect-4/3 cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-slate-900 shadow-lg"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      variants={cardItemVariants}
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
        // При наведении на карточку изображение слегка увеличивается
        variants={{
          hover: { scale: 1.05, transition: { duration: 0.3 } },
        }}
      />

      {/* Оверлей с информацией (показывается при наведении на десктопе, всегда на мобильных) */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-3 sm:p-4 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        // На мобильных оверлей виден всегда (из-за особенностей hover)
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
