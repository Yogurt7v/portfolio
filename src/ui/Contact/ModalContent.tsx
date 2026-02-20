import React from 'react';
import { motion } from 'framer-motion';
import { modalVariants } from '../../utils/animations';
import ContactForm from './ContactForm';

interface ModalContentProps {
  onClose: () => void;
  onFormSuccess?: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, onFormSuccess }) => {
  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
        aria-label="Закрыть"
      >
        ✕
      </button>

      <h2 className="text-3xl font-black text-white mb-2">Написать мне</h2>
      <p className="text-slate-400 mb-8 text-sm">
        Оставьте сообщение, и я отвечу вам в ближайшее время.
      </p>

      <ContactForm onSuccess={onFormSuccess} />
    </motion.div>
  );
};

export default ModalContent;
