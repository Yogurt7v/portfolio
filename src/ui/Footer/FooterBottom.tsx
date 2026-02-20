import React from 'react';
import { currentYear } from '../../utils/generateYearArray';
import { RESUME_PATH, SOCIAL_LINKS } from '../../utils/constants';

const FooterBottom: React.FC = () => {
  return (
    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/50 text-xs font-medium uppercase tracking-wider">
      <p>© {currentYear} Egorov Sergey. Все права защищены.</p>
      <div className="flex gap-8">
        <a
          href={RESUME_PATH}
          target="_blank"
          download="resume.pdf"
          className="hover:text-white transition-colors underline"
        >
          Скачать резюме
        </a>
        <a
          href={SOCIAL_LINKS.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default FooterBottom;
