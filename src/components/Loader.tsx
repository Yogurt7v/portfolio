import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="w-full max-w-md mx-auto py-12 flex flex-col items-center gap-4">
      {/* Текст  */}
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400"
      >
        Загрузка...
      </motion.span>

      <div className="relative w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
        {/* Основной бегущий луч */}
        <motion.div
          className="absolute h-full w-1/3 bg-linear-to-r from-transparent via-blue-500 to-transparent"
          initial={{ left: '-40%' }}
          animate={{ left: '110%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Эффект свечения (Glow) */}
        <motion.div
          className="absolute h-full w-20 bg-blue-400 blur-sm"
          initial={{ left: '-40%' }}
          animate={{ left: '110%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Декоративные точки по бокам */}
      <div className="flex justify-between w-full px-1">
        <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
        <div className="w-1 h-1 bg-blue-500/50 rounded-full" />
      </div>
    </div>
  );
};

export default Loader;
