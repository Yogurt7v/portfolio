import React from 'react';
import type { FormInputProps } from '../../types/contacts';

const FormInput: React.FC<FormInputProps> = ({ className = '', ...props }) => {
  return (
    <input
      {...props}
      className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all ${className}`}
    />
  );
};

export default FormInput;
