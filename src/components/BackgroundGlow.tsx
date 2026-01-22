import React, { useEffect, useRef } from 'react';

export function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Настройки пятен
    const blobs = [
      {
        x: 0,
        y: 0,
        r: 400,
        color: '#1d4ed8',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
      }, // Синий
      {
        x: 0,
        y: 0,
        r: 350,
        color: '#7c3aed',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
      }, // Фиолетовый
      {
        x: 0,
        y: 0,
        r: 500,
        color: '#0f172a',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
      }, // Темный
      {
        x: 0,
        y: 0,
        r: 300,
        color: '#0ea5e9',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
      }, // Циан
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Заполняем базовый фон (очень темный)
      ctx.fillStyle = 'rgba(2, 6, 23, 1)'; // Глубокий темный фон
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        // Движение по шуму (имитация)
        blob.tx += 0.002;
        blob.ty += 0.002;

        // Плавное перемещение координат
        const x = Math.sin(blob.tx) * (canvas.width / 2) + canvas.width / 2;
        const y = Math.cos(blob.ty) * (canvas.height / 2) + canvas.height / 2;

        // Рисуем градиентное пятно
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.5, blob.color + '66'); // 40% прозрачности в середине
        gradient.addColorStop(1, 'transparent');

        ctx.globalCompositeOperation = 'screen'; // Смешивание цветов
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: -1, backgroundColor: '#020617' }} // Базовый темный цвет
    >
      <canvas
        ref={canvasRef}
        style={{
          filter: 'blur(100px)',
          transform: 'scale(1.2)',
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Полупрозрачная маска поверх канваса для лучшей читаемости текста */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
    </div>
  );
}

export default BackgroundGradient;
