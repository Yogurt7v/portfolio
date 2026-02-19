import { a } from 'framer-motion/m';
import type { ReactElement, ReactNode } from 'react';
import type { JsxElement } from 'typescript';

interface AccentButton {
  title: string;
  onClick: () => void;
  className: string;
  accent: 'main' | 'second';
  icon?: ReactNode;
}

export const AccentButton = ({
  title,
  onClick,
  className,
  accent,
  icon,
}: AccentButton) => {
  return (
    <>
      <div className={className}>
        <button
          onClick={() => onClick()}
          className={`px-8 py-4 ${
            accent === 'main'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-slate-800 hover:bg-slate-700'
          } text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2`}
        >
          {icon}
          {title}
        </button>
      </div>
    </>
  );
};
