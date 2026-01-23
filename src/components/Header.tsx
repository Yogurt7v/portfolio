import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/navLinks';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Состояние уже было, теперь используем

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false); // Закрываем меню при клике на лого
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0  z-100 p-6 transition-all duration-500 " id="header">
      <nav className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500
            ${
              isScrolled || isOpen
                ? 'bg-slate-950/80 border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                : 'bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 group cursor-pointer z-50"
            onClick={scrollToTop}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-all duration-700">
              Y
            </div>
            <span className="text-white font-bold tracking-tighter ">
              PORTFOLIO<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* ИЗМЕНЕНИЕ: Добавили hidden md:flex, чтобы скрыть на мобилках */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors font-bold relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="https://www.hh.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-5 py-2 bg-white text-black text-xs font-black uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              HH.ru
            </a>

            {/* НОВОЕ: Кнопка бургер (только для мобильных md:hidden) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 z-50 p-1"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </motion.div>

        {/* НОВОЕ: Выпадающее мобильное меню */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-4 p-6 bg-slate-950/90 border border-white/10 backdrop-blur-2xl rounded-3xl md:hidden z-40"
            >
              <ul className="flex flex-col gap-6 items-center">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm uppercase tracking-widest text-slate-300 hover:text-white transition-colors font-bold"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
