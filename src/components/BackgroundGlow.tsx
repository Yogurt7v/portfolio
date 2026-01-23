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
      // Основные крупные пятна
      {
        x: 0,
        y: 0,
        r: 550,
        color: '#1e3a8a',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.0015,
      },
      {
        x: 0,
        y: 0,
        r: 500,
        color: '#4c1d95',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.002,
      },
      {
        x: 0,
        y: 0,
        r: 650,
        color: '#0f172a',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.001,
      },

      // Новые дополнительные пятна для детализации
      {
        x: 0,
        y: 0,
        r: 400,
        color: '#1d4ed8',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.0025,
      }, // Яркий синий акцент
      {
        x: 0,
        y: 0,
        r: 350,
        color: '#064e3b',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.0018,
      }, // Глубокий изумрудный (почти черный)
      {
        x: 0,
        y: 0,
        r: 450,
        color: '#312e81',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.0012,
      }, // Индиго
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob) => {
        // Используем индивидуальную скорость каждого пятна
        blob.tx += blob.speed || 0.002;
        blob.ty += blob.speed || 0.002;

        const x = Math.sin(blob.tx) * (canvas.width / 2) + canvas.width / 2;
        const y = Math.cos(blob.ty) * (canvas.height / 2) + canvas.height / 2;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');

        ctx.globalCompositeOperation = 'screen';
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
          filter: 'blur(60px)',
          width: '100%',
          height: '100%',
        }}
        className="md:blur-[120px]"
      />
      {/* Полупрозрачная маска поверх канваса для лучшей читаемости текста */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
    </div>
  );
}

export default BackgroundGradient;
