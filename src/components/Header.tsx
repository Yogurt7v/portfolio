import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/navLinks';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Следим за скроллом, чтобы менять стиль шапки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-100 p-6 transition-all duration-500"
      id="header"
    >
      <nav className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'circOut' }}
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500
            ${
              isScrolled
                ? 'bg-slate-950/40 border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                : 'bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform">
              Y
            </div>
            <span className="text-white font-bold tracking-tighter hidden sm:block">
              PORTFOLIO<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Nav Links */}
          <ul className="flex items-center gap-8">
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

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:flex px-5 py-2 bg-white text-black text-xs font-black uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95"
          >
            Hire Me
          </a>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
