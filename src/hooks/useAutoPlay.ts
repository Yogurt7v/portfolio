import { useEffect, useRef } from 'react';
import { TIMER_CHANGE_CARD } from '../utils/constants';

export const useAutoPlay = (
  isAutoPlaying: boolean,
  isPreviewOpen: boolean,
  totalItems: number,
  onNext: () => void,
) => {
  const savedCallback = useRef(onNext);

  useEffect(() => {
    savedCallback.current = onNext;
  }, [onNext]);

  useEffect(() => {
    if (isAutoPlaying && !isPreviewOpen && totalItems > 1) {
      const interval = setInterval(() => {
        savedCallback.current();
      }, TIMER_CHANGE_CARD);

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, isPreviewOpen, totalItems]); // Убрали onNext из зависимостей
};
