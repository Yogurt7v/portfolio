import React from 'react';

interface SectionHeaderProps {
  title: string;
  accent?: string; // цвет для точки, по умолчанию blue-500
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  accent = 'text-blue-500',
}) => {
  return (
    <div className="flex flex-col items-center mb-12 sm:mb-20">
      <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
        {title}
        <span className={accent}>.</span>
      </h2>
      <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
    </div>
  );
};

export default SectionHeader;
