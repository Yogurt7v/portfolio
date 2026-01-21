import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experienceData } from '../data/experience';

const Timeline: React.FC = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative max-w-6xl mx-auto py-32 px-4 overflow-visible"
    >
      <div className="text-center mb-32">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-white italic uppercase tracking-tighter"
        >
          Experience
        </motion.h2>
      </div>

      <div className="relative">
        {/* Центральная линия-подложка */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 md:-translate-x-1/2" />

        {/* Активная линия скролла */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />

        <div className="space-y-32">
          {experienceData.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center justify-between w-full"
              >
                {/* ТОЧКА на линии */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 z-20 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2" />

                {/* Блок с ПЕРИОДОМ (напротив карточки) */}
                <div
                  className={`hidden md:flex w-[45%] items-center ${isEven ? 'justify-end pr-12' : 'justify-start pl-12 order-last'}`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: 'circOut' }}
                  >
                    <span className="text-3xl font-black text-white/20 group-hover:text-blue-500/50 transition-colors duration-500">
                      {exp.period}
                    </span>
                  </motion.div>
                </div>

                {/* КАРТОЧКА */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isEven ? 100 : -100,
                    rotate: isEven ? 2 : -2,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                    duration: 0.8,
                  }}
                  className="w-full md:w-[45%] pl-20 md:pl-0"
                >
                  <div className="bg-white/3 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/6 hover:border-blue-500/30 transition-all duration-500 shadow-2xl relative group">
                    {/* Мобильный период */}
                    <div className="md:hidden text-blue-500 font-mono text-sm font-bold mb-2">
                      {exp.period}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-blue-400/80 font-medium uppercase text-xs tracking-widest mb-4">
                      {exp.position}
                    </p>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <ul className="space-y-3">
                      {exp.achievements.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-500">
                          <span className="text-blue-500/50 mt-1">/</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
