import { aboutMe } from '../data/aboutMe';

export const MainFoto = () => {
  return (
    <div className="relative w-full max-w-70 sm:max-w-[320px] aspect-4/5 group">
      <div className="absolute -inset-0.5 bg-blue-500/40 rounded-[1.9rem] blur-sm animate-pulse pointer-events-none" />

      {/* 2. Контейнер с фото и акцентированной границей */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30 group-hover:border-blue-400 transition-colors duration-700 bg-slate-900 z-10">
        {/* Внутреннее микро-свечение по краям */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl shadow-[inset_0_0_8px_rgba(59,130,246,0.2)]" />

        <img
          loading="lazy"
          src={aboutMe.myPhoto}
          alt="Фото"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Градиент для глубины, чтобы граница лучше "читалась" */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent" />
      </div>

      {/* 3. Дополнительная "световая нить" (Border Layer) */}
      <div
        className="absolute -inset-[0.5px] rounded-3xl border border-blue-400/20 animate-pulse z-20 pointer-events-none"
        style={{ animationDuration: '3s' }}
      />
    </div>
  );
};
