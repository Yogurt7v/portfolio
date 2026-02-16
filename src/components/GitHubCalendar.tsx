import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { username } from '../data/aboutMe';
import { CHANGE_YEAR_INTERVAL } from '../data/experience';

// Варианты анимации для всей карточки
const cardVariants = {
  hidden: { opacity: 0, rotate: -2, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 200,
      delay: 0.1,
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Варианты для заголовка
const titleVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 15, stiffness: 300 },
  },
};

// Варианты для кнопок (выезжают справа с задержкой)
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.5, x: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 250,
      delay: custom * 0.05,
    },
  }),
};

const GithubActivity = () => {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="bg-white/2 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
        variants={cardVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
          // Начальное состояние не нужно, дочерние элементы управляются своими variants
        >
          <motion.h3
            className="text-3xl font-bold text-white flex items-center gap-3"
            variants={titleVariants}
          >
            GitHub Contributions
          </motion.h3>

          <motion.div
            className="flex bg-white/5 p-1 rounded-2xl border border-white/10"
            // variants не задаём, кнопки будут управляться индивидуально
          >
            {years.map((year, idx) => (
              <motion.button
                key={year}
                custom={idx}
                variants={buttonVariants}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {year}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Календарь*/}
        <motion.div className="overflow-hidden" style={{ minHeight: 180 }}>
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
            showTotalCount={false}
          />
        </motion.div>

        {/* Пробегающий блик */}
        <motion.div
          className="absolute inset-0 rounded-[3rem] pointer-events-none"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{
            opacity: [0, 0.2, 0],
            scale: 1,
            transition: { duration: 2, times: [0, 0.3, 1] },
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

export default GithubActivity;
