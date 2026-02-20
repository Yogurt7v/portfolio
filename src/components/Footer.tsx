import React, { useState } from 'react';
import { useOpenLink } from '../hooks/useOpenLink';
import { SOCIAL_LINKS } from '../utils/constants';
import ContactSection from '../ui/Footer/ContactSection';
import FooterBottom from '../ui/Footer/FooterBottom';
import ContactModal from '../ui/Contact/ContactModal';

const Footer: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openLink = useOpenLink();

  const handleTelegramClick = () => openLink(SOCIAL_LINKS.TELEGRAM);

  return (
    <footer className="relative py-8 px-4 overflow-hidden max-w-5xl mx-auto" id="contact">
      <div className="bg-linear-to-br from-blue-950/40 to-black/40 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl relative z-10">
        <ContactSection
          onMailClick={() => setIsContactOpen(true)}
          onTelegramClick={handleTelegramClick}
        />
        <FooterBottom />
      </div>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};

export default Footer;
