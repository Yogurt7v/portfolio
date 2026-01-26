import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Когда компонент монтируется (модалка открыта), принудительно запускаем загрузку
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-900 ${className}`}>
      <video
        ref={videoRef}
        poster={poster} // Скриншот, который виден до загрузки видео
        playsInline
        muted
        loop
        autoPlay
        preload="none" // Не грузим видео, пока модалка закрыта
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        {/* Можно добавить вторую сорсу для .webm, если есть */}
        Ваш браузер не поддерживает видео.
      </video>

      {/* Мягкий градиент поверх для стиля */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-slate-950/20 to-transparent" />
    </div>
  );
};

export default VideoPlayer;
