import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/aboutMe';

const About: React.FC = () => {
  return (
    <section id="about" className="relative py-8 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Левая колонка: Фотография */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="relative w-full aspect-square md:aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 group"
        >
          {/* Замени 'your-photo.jpg' на путь к твоей фотографии */}
          <img
            src={aboutMe.myPhoto}
            alt="Ваша фотография"
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />

          {/* Декоративный глоу-эффект */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen" />
        </motion.div>

        {/* Правая колонка: Текст "О себе" */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className="text-white"
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

          <div className="mt-10">
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-xl"
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
