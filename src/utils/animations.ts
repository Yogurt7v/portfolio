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

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // задержка между появлениями дочерних элементов
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 150,
      rotateX: { type: 'tween', duration: 0.4, ease: 'easeOut' }, // отдельная настройка для вращения
    },
  },
};

export const certContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },
};

export const certCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.8,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 150,
      mass: 0.6,
    },
  },
};
