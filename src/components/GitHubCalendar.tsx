import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { username } from '../data/aboutMe';
import { CHANGE_YEAR_INTERVAL } from '../data/experience';
import { gitButtonVariants, gitVariants } from '../utils/animations';
import { currentYear, yearsList } from '../utils/generateYearArray';

const GithubSection = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const customTheme = {
    dark: ['#ffffff05', '#0c4a6e', '#075985', '#0369a1', '#0ea5e9'],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedYear((prevYear) => {
        const currentIndex = yearsList.indexOf(prevYear);
        const nextIndex = (currentIndex + 1) % yearsList.length;
        return yearsList[nextIndex];
      });
    }, CHANGE_YEAR_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="hidden xl:grid  py-24 px-4 mx-auto"
      id="github"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.55 }}
    >
      <motion.div
        variants={gitVariants}
        className="bg-white/2 backdrop-blur-3xl  border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.h3
            variants={gitVariants} // Использует те же initial/animate от родителя
            className="text-3xl font-bold text-white flex items-center gap-3"
          >
            GitHub Contributions
          </motion.h3>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {yearsList.map((year) => (
              <motion.button
                key={year}
                variants={gitButtonVariants} // Появится с задержкой staggerChildren
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
