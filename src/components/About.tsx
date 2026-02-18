import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/aboutMe';

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 15, stiffness: 300 },
  },
};

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
          <div className="relative w-full max-w-70 sm:max-w-[320px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src={aboutMe.myPhoto}
              alt="Фото"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
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
      {/* Заголовок */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        variants={titleVariants}
      >
        <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org"
            className="mx-2 inline-block"
          >
            <path
              d="M7 13L12 18L17 13"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M7 7L12 12L17 7"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          Мои проекты
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org"
            className="mx-2 inline-block"
          >
            <path
              d="M7 13L12 18L17 13"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M7 7L12 12L17 7"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <animate
                attributeName="opacity"
                values="1;0;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </h2>
      </motion.div>
    </section>
  );
};

export default About;
