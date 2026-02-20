import React from 'react';
import { motion } from 'framer-motion';
import type { SubmitButtonProps } from '../../types/contacts';

const statusText = {
  idle: 'Отправить',
  sending: 'Отправка...',
  success: 'Готово!',
  error: 'Ошибка!',
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ status }) => {
  const baseClass =
    'w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-white shadow-lg transition-all disabled:opacity-70';
  const statusClass =
    status === 'success'
      ? 'bg-green-600'
      : status === 'error'
        ? 'bg-red-600'
        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={status === 'sending'}
      className={`${baseClass} ${statusClass}`}
    >
      {statusText[status]}
    </motion.button>
  );
};

export default SubmitButton;
