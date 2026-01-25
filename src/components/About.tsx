import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/aboutMe';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-12 mt-10 px-4 overflow-hidden max-w-6xl mx-auto"
    >
      {/* Используем 12-колоночную сетку для точного контроля размера */}
      <div className="grid grid-cols-1 px-5 md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Текстовая колонка (8 из 12) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-white md:col-span-8 order-2 md:order-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Немного <span className="text-blue-500 italic">обо мне</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {aboutMe.greetings}
          </p>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {aboutMe.mySkills}
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">{aboutMe.hobby}</p>
        </motion.div>

        {/* Колонка с фотографией (4 из 12) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="md:col-span-4 order-1 md:order-2 flex-col justify-center md:justify-end"
        >
          <div className="relative mt-10 w-full max-w-[320px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src={aboutMe.myPhoto}
              alt="Ваша фотография"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />

            {/* Декоративный эффект */}
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />

            {/* Мягкое свечение за фото */}
            <div className="absolute -inset-4 bg-blue-600/5 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-10 flex justify-center">
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-600/20"
            >
              Связаться со мной
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
