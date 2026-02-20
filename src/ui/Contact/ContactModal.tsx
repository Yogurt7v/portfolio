import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContactModalProps } from '../../types/contacts';
import { overlayVariants } from '../../utils/animations';
import ModalContent from './ModalContent';

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Оверлей */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Контент модалки */}
          <ModalContent onClose={onClose} onFormSuccess={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
