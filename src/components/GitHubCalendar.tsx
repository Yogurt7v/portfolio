import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { username } from '../data/aboutMe';

const GithubActivity = () => {
  const currentYear = new Date().getFullYear();
  const years = [2026, 2025, 2024, 2023];

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const customTheme = {
    dark: ['#ffffff05', '#0c4a6e', '#075985', '#0369a1', '#0ea5e9'],
  };

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto" id="github">
      <div className="bg-white/2 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Contributions
            </h3>
          </div>

          {/* Переключатель лет */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year!)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Сетка календаря с анимацией при смене года */}
        <div className="relative overflow-x-auto pb-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
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
                labels={{
                  months: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;
