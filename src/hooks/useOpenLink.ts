import { useCallback } from 'react';

export const useOpenLink = () => {
  const openLink = useCallback((url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return openLink;
};
