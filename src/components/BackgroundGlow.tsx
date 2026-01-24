import React, { useEffect, useRef } from 'react';

export function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isMobile = window.innerWidth < 768;

    // Настройки пятен с адаптивными радиусами
    const getBlobRadius = (baseRadius: number) => {
      // На мобильных устройствах уменьшаем радиусы пропорционально
      const maxDimension = Math.max(window.innerWidth, window.innerHeight);
      return isMobile ? Math.min(baseRadius * 0.4, maxDimension * 0.8) : baseRadius;
    };

    const blobs = [
      // Основные крупные пятна
      {
        x: 0,
        y: 0,
        baseR: 550,
        r: 0, // будет вычисляться динамически
        color: '#1e3a8a',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.0015,
      },
      {
        x: 0,
        y: 0,
        baseR: 500,
        r: 0,
        color: '#4c1d95',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.002,
      },
      {
        x: 0,
        y: 0,
        baseR: 650,
        r: 0,
        color: '#0f172a',
        tx: Math.random() * 1000,
        ty: Math.random() * 1000,
        speed: 0.001,
      },

      // Дополнительные пятна (меньше на мобильных для производительности)
      ...(isMobile ? [] : [
        {
          x: 0,
          y: 0,
          baseR: 400,
          r: 0,
          color: '#1d4ed8',
          tx: Math.random() * 1000,
          ty: Math.random() * 1000,
          speed: 0.0025,
        },
        {
          x: 0,
          y: 0,
          baseR: 350,
          r: 0,
          color: '#064e3b',
          tx: Math.random() * 1000,
          ty: Math.random() * 1000,
          speed: 0.0018,
        },
        {
          x: 0,
          y: 0,
          baseR: 450,
          r: 0,
          color: '#312e81',
          tx: Math.random() * 1000,
          ty: Math.random() * 1000,
          speed: 0.0012,
        },
      ]),
    ];

    // Инициализация радиусов
    blobs.forEach((blob) => {
      blob.r = getBlobRadius(blob.baseR);
    });

    const resize = () => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth < 768;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Пересчитываем радиусы при изменении размера
      blobs.forEach((blob) => {
        blob.r = getBlobRadius(blob.baseR);
      });

      // Если переключились между мобильным и десктопом, пересоздаем массив blob'ов
      if (wasMobile !== isMobile) {
        // Обновляем массив blob'ов
        if (isMobile && blobs.length > 3) {
          blobs.splice(3);
        } else if (!isMobile && blobs.length === 3) {
          blobs.push(
            {
              x: 0,
              y: 0,
              baseR: 400,
              r: getBlobRadius(400),
              color: '#1d4ed8',
              tx: Math.random() * 1000,
              ty: Math.random() * 1000,
              speed: 0.0025,
            },
            {
              x: 0,
              y: 0,
              baseR: 350,
              r: getBlobRadius(350),
              color: '#064e3b',
              tx: Math.random() * 1000,
              ty: Math.random() * 1000,
              speed: 0.0018,
            },
            {
              x: 0,
              y: 0,
              baseR: 450,
              r: getBlobRadius(450),
              color: '#312e81',
              tx: Math.random() * 1000,
              ty: Math.random() * 1000,
              speed: 0.0012,
            }
          );
        }
      }
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
