import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactModal from './ContactModal';
import { AccentButton } from '../ui/AccentButton';
import { TelegramLogo } from '../icons/TelegramLogo';
import { MailBox } from '../icons/MailBox';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="relative py-8 px-4 overflow-hidden max-w-5xl mx-auto" id="contact">
      <div className="bg-linear-to-br from-blue-950/40 to-black/40 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl relative z-10">
        <div className="text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tighter"
          >
            ДАВАЙТЕ ОБЩАТЬСЯ!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg"
          >
            Я всегда открыт к новым проектам и интересным идеям. Если у вас есть что
            обсудить, не стесняйтесь связаться со мной.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-20"
          >
            <AccentButton
              title={'Написать на почту'}
              className=""
              onClick={() => setIsContactOpen(true)}
              accent="main"
              icon={<MailBox />}
            />
            <AccentButton
              title={'Telegram'}
              className=""
              onClick={() => openLink('https://t.me/yogurt7v')}
              accent="second"
              icon={<TelegramLogo />}
            />
          </motion.div>
        </div>

        {/* Нижняя секция с копирайтом и ссылками */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-xs font-medium uppercase tracking-wider">
          <p>© {currentYear} Egorov Sergey. Все права защищены.</p>
          <div className="flex gap-8">
            <a
              href="./resume.pdf"
              target="_blank"
              download={'.resume.pdf'}
              className="hover:text-white transition-colors underline"
            >
              Скачать резюме
            </a>
            <a
              href="https://github.com/Yogurt7v"
              target="_blank"
              className="hover:text-white transition-colors "
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};

export default Footer;
