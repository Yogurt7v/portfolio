import React from 'react';
import type { FormTextareaProps } from '../../types/contacts';

const FormTextarea: React.FC<FormTextareaProps> = ({ className = '', ...props }) => {
  return (
    <textarea
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none ${className}`}
    />
  );
};

export default FormTextarea;
