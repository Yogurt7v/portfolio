import { useEffect } from 'react';
import { TIMER_CHANGE_CARD } from '../utils/constants';

export const useAutoPlay = (
  isAutoPlaying: boolean,
  isPreviewOpen: boolean,
  totalItems: number,
  onNext: () => void,
) => {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && !isPreviewOpen && totalItems > 0) {
      interval = setInterval(() => {
        onNext();
      }, TIMER_CHANGE_CARD);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, isPreviewOpen, totalItems, onNext]);
};
