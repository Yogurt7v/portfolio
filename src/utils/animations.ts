import type { Variants } from 'framer-motion';

export const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};

export const filtersVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 15, stiffness: 300 },
  },
};

export const sliderVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 20, stiffness: 200 },
  },
};

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 250 },
  },
};

export const gitVariants: Variants = {
  initial: { opacity: 0, rotate: -2, scale: 0.95, x: -30 }, // Для заголовка добавил x
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export const gitButtonVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 12 },
  },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
};
