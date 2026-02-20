import React from 'react';

interface PlayPauseButtonProps {
  isAutoPlaying: boolean;
  onToggle: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isAutoPlaying, onToggle }) => {
  return (
    <button
      aria-label="Автозапуск"
      onClick={onToggle}
      className="absolute bottom-4 right-4 md:bottom-6 md:right-8 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-colors"
      title={isAutoPlaying ? 'Pause' : 'Play'}
    >
      {isAutoPlaying ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="md:w-5 md:h-5"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="md:w-5 md:h-5"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};

export default PlayPauseButton;
