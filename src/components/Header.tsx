import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/navLinks';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 md:px-6">
      <div className="flex justify-center">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`
            mt-4 w-full max-w-5xl
            px-5 py-3 rounded-full border
            transition-all duration-500
            ${
              isScrolled || isOpen
                ? 'bg-slate-950/80 border-white/10 backdrop-blur-xl shadow-xl'
                : 'bg-transparent border-transparent'
            }
          `}
        >
          {/* GRID — ключевой момент */}
          <div className="grid grid-cols-3 items-center">
            {/* LEFT */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">
                Y
              </div>
              <span className="text-white font-bold tracking-tight">
                PORTFOLIO<span className="text-blue-500">.</span>
              </span>
            </div>

            {/* CENTER (desktop only) */}
            <ul className="hidden md:flex justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-widest text-slate-400 hover:text-white font-bold relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* RIGHT */}
            <div className="flex justify-end items-center gap-3">
              <a
                href="https://www.hh.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex px-5 py-2 bg-white text-black text-xs font-black uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all"
              >
                HH.ru
              </a>

              {/* Burger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
              >
                <span
                  className={`w-6 h-0.5 bg-white transition ${isOpen && 'rotate-45 translate-y-1.5'}`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition ${isOpen && 'opacity-0'}`}
                />
                <span
                  className={`w-6 h-0.5 bg-white transition ${isOpen && '-rotate-45 -translate-y-1.5'}`}
                />
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 p-6"
              >
                <ul className="flex flex-col items-center gap-6">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm uppercase tracking-widest text-slate-300 hover:text-white font-bold"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
