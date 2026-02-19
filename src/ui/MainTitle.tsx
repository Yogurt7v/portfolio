import React from 'react';
import { motion } from 'framer-motion';
import { ArrowIcon } from './ArrowsIcon';

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 300 },
  },
};

export const MainTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="text-center mt-20" // Добавил отступ снизу
      variants={titleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white flex items-center justify-center gap-3 sm:gap-5">
        <ArrowIcon />
        <span>{children}</span>
        <ArrowIcon />
      </h2>
    </motion.div>
  );
};
