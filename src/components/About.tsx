import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/aboutMe';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-12 mt-10 px-4 overflow-hidden max-w-6xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Мобильный заголовок */}
        <div className="col-span-1 md:hidden">
          <h2 className="text-3xl font-extrabold leading-tight text-center">
            Немного <span className="text-blue-500 italic">обо мне</span>
          </h2>
        </div>

        {/* Колонка с фото */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 order-1 md:order-2 flex flex-col items-center"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src={aboutMe.myPhoto}
              alt="Фото"
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Кнопка для десктопа */}
          <div className="hidden md:flex mt-10 w-full justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
            >
              Связаться со мной
            </a>
          </div>
        </motion.div>

        {/* Текстовая колонка */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-white md:col-span-8 order-2 md:order-1"
        >
          <h2 className="hidden md:block text-5xl font-extrabold mb-8 leading-tight">
            Немного <span className="text-blue-500 italic">обо мне</span>
          </h2>
          <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed text-center md:text-left">
            <p>{aboutMe.greetings}</p>
            <p>{aboutMe.mySkills}</p>
            <p>{aboutMe.hobby}</p>
          </div>

          {/* Кнопка для мобильных */}
          <div className="flex md:hidden mt-10 justify-center">
            <a
              href="#contact"
              className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-lg active:scale-95 shadow-xl"
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
