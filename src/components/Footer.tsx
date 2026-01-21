import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-linear-to-br from-blue-950/40 to-black/40 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl relative z-10">
        <div className="text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tighter"
          >
            ГОТОВЫ К СЛЕДУЮЩЕМУ ВЫЗОВУ? <br />
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
            <a
              href="mailto:your.email@example.com"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Написать на почту
            </a>
            <a
              href="https://t.me/yourusername"
              className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg shadow-xl hover:bg-slate-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4.25-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              Telegram
            </a>
          </motion.div>
        </div>

        {/* Нижняя секция с копирайтом и ссылками */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-xs font-medium uppercase tracking-wider">
          <p>© {currentYear} Твое Имя. Все права защищены.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
