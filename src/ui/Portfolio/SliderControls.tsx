import React from 'react';
import { useMobile } from '../../hooks/useMobile';

interface SliderControlsProps {
  totalSlides: number;
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  disableAutoPlay?: () => void; // колбэк для отключения автоплея при ручной навигации
}

const SliderControls: React.FC<SliderControlsProps> = ({
  totalSlides,
  currentSlide,
  onPrev,
  onNext,
  onDotClick,
  disableAutoPlay,
}) => {
  const isMobile = useMobile();

  const handlePrev = () => {
    onPrev();
    disableAutoPlay?.();
  };

  const handleNext = () => {
    onNext();
    disableAutoPlay?.();
  };

  const handleDotClick = (index: number) => {
    onDotClick(index);
    disableAutoPlay?.();
  };

  if (isMobile) {
    return (
      <div className="flex justify-center flex-wrap gap-2 mt-5 px-10 pb-6">
        <button
          aria-label="Предыдущий проект"
          onClick={handlePrev}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>←</span> Prev
        </button>
        <button
          aria-label="Следующий проект"
          onClick={handleNext}
          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors flex items-center gap-1"
        >
          Next <span>→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 mt-5 px-10 pb-6">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          aria-label="Просмотр проекта"
          key={i}
          onClick={() => handleDotClick(i)}
          className={`h-2 rounded-full transition-all duration-300 hover:cursor-pointer ${
            i === currentSlide ? 'bg-blue-500 w-6 md:w-18' : 'bg-white/20 w-1.5 md:w-2'
          }`}
        />
      ))}
    </div>
  );
};

export default SliderControls;
