import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Исправлен импорт (убраны фигурные скобки)
import { GitHubCalendar } from 'react-github-calendar';
import { username } from '../data/aboutMe';
import { CHANGE_YEAR_INTERVAL } from '../data/experience';

const variants = {
  initial: { opacity: 0, rotate: -2, scale: 0.95, x: -30 }, // Для заголовка добавил x
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 12 },
  },
};

const GithubSection = () => {
  const currentYear = new Date().getFullYear();
  const years = [2026, 2025, 2024, 2023];
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const customTheme = {
    dark: ['#ffffff05', '#0c4a6e', '#075985', '#0369a1', '#0ea5e9'],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedYear((prevYear) => {
        const currentIndex = years.indexOf(prevYear);
        const nextIndex = (currentIndex + 1) % years.length;
        return years[nextIndex];
      });
    }, CHANGE_YEAR_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="hidden xl:grid max-w-6xl py-24 px-4 mx-auto"
      id="github"
      // Единые названия для всей ветки компонентов
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={variants}
        className="bg-white/2 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.h3
            variants={variants} // Использует те же initial/animate от родителя
            className="text-3xl font-bold text-white flex items-center gap-3"
          >
            GitHub Contributions
          </motion.h3>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {years.map((year) => (
              <motion.button
                key={year}
                variants={buttonVariants} // Появится с задержкой staggerChildren
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ minHeight: 180 }}
        >
          <GitHubCalendar
            username={username}
            year={selectedYear}
            theme={customTheme}
            weekStart={1}
            colorScheme="dark"
            fontSize={13}
            blockSize={13}
            blockMargin={5}
            showWeekdayLabels
          />
        </motion.div>

        {/* Декоративный блик — лучше сделать через animate, а не whileInView, 
            чтобы он сработал синхронно с появлением карточки */}
        <motion.div
          className="absolute inset-0 rounded-[3rem] pointer-events-none"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: [0, 0.2, 0],
              transition: { duration: 3, repeat: Infinity, repeatDelay: 2 },
            },
          }}
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </motion.section>
  );
};

export default GithubSection;
