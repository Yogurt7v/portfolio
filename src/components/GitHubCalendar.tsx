import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { username } from '../data/aboutMe';
import { CHANGE_YEAR_INTERVAL } from '../data/experience';

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
    <section className="hidden xl:grid max-w-6xl py-24 px-4 mx-auto" id="github">
      <div className="bg-white/2 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h3 className="text-3xl font-bold text-white flex items-center gap-3">
            GitHub Contributions
          </h3>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="overflow-hidden"
          style={{
            minHeight: 180,
          }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
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
            showTotalCount={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GithubActivity;
