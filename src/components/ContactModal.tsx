import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const response = await fetch('https://formspree.io/f/mojlpdrg', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        formRef.current?.reset();
      }, 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Оверлей (задний фон) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
          />

          {/* Контент модалки */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <h2 className="text-3xl font-black text-white mb-2">Написать мне</h2>
            <p className="text-slate-400 mb-8 text-sm">
              Оставьте сообщение, и я отвечу вам в ближайшее время.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                name="name"
                placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Сообщение..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all
                  ${status === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white shadow-lg shadow-blue-500/20`}
              >
                {status === 'idle' && 'Отправить'}
                {status === 'sending' && 'Отправка...'}
                {status === 'success' && 'Готово!'}
                {status === 'error' && 'Ошибка!'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
