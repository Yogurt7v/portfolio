import React from 'react';
import { motion } from 'framer-motion';
import { AccentButton } from '../../ui/AccentButton';
import { MailBox } from '../../icons/MailBox';
import { TelegramLogo } from '../../icons/TelegramLogo';

interface ContactSectionProps {
  onMailClick: () => void;
  onTelegramClick: () => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onMailClick,
  onTelegramClick,
}) => {
  return (
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
        Я всегда открыт к новым проектам и интересным идеям. Если у вас есть что обсудить,
        не стесняйтесь связаться со мной.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-6 mb-20"
      >
        <AccentButton
          title="Написать на почту"
          onClick={onMailClick}
          accent="main"
          icon={<MailBox />}
          className=""
        />
        <AccentButton
          title="Telegram"
          onClick={onTelegramClick}
          accent="second"
          icon={<TelegramLogo />}
          className=""
        />
      </motion.div>
    </div>
  );
};

export default ContactSection;
