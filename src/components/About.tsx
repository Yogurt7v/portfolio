import React from 'react';
import { motion } from 'framer-motion';
import { aboutMe } from '../data/aboutMe';
import { MainTitle } from '../ui/MainTitle';
import { MainFoto } from '../ui/MainFoto';
import { AccentButton } from '../ui/AccentButton';
import { MobileTitle } from '../ui/MobileTitle';
import { MobileButton } from '../ui/MobileButton';

const handleContactClick = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-12 mt-10 px-4 overflow-hidden max-w-6xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Мобильный заголовок */}
        <MobileTitle main={'Немного'} second={'обо мне'} />

        {/* Колонка с фото */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 order-1 md:order-2 flex flex-col items-center"
        >
          <MainFoto />
          {/* Кнопка для десктопа */}
          <AccentButton
            title={'Связаться со мной'}
            className={'hidden md:flex mt-10 w-full justify-center'}
            onClick={handleContactClick}
            accent="main"
          />
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
          <MobileButton title={'Связаться со мной'} />
        </motion.div>
      </div>
      {/* Заголовок */}
      <MainTitle>Мои проекты</MainTitle>
    </section>
  );
};

export default About;
