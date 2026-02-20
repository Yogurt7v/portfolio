import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import type { Project } from './ProjectCard';

interface ModalProps {
  previewProject: Project | null;
  setPreviewProject: (a: any) => void;
}

const Modal: React.FC<ModalProps> = ({ previewProject, setPreviewProject }) => {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(
    null,
  );
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);

  // Блокируем скролл основной страницы при открытии
  useEffect(() => {
    if (previewProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [previewProject]);

  const openScreenshotModal = (index: number) => {
    setSelectedScreenshotIndex(index);
    setIsScreenshotModalOpen(true);
  };

  const closeScreenshotModal = () => {
    setIsScreenshotModalOpen(false);
    setSelectedScreenshotIndex(null);
  };

  const goToPreviousScreenshot = () => {
    if (selectedScreenshotIndex !== null && previewProject) {
      const newIndex =
        selectedScreenshotIndex > 0
          ? selectedScreenshotIndex - 1
          : previewProject.screenshots.length - 1;
      setSelectedScreenshotIndex(newIndex);
    }
  };

  const goToNextScreenshot = () => {
    if (selectedScreenshotIndex !== null && previewProject) {
      const newIndex =
        selectedScreenshotIndex < previewProject.screenshots.length - 1
          ? selectedScreenshotIndex + 1
          : 0;
      setSelectedScreenshotIndex(newIndex);
    }
  };

  return (
    <AnimatePresence>
      {previewProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreviewProject(null)}
          // Исправлено: items-start для мобильных + overflow-y-auto
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xl cursor-zoom-out overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            // Исправлено: min-h-min чтобы не схлопывалось, и закругления rounded-2xl/4xl
            className="relative bg-slate-900 border border-white/20 rounded-2xl sm:rounded-[2rem] overflow-hidden w-full max-w-5xl shadow-2xl cursor-default my-auto"
          >
            {/* Кнопка закрытия */}
            <motion.button
              onClick={() => setPreviewProject(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/10 rounded-full backdrop-blur-md"
            >
              <span className="text-white text-xl">✕</span>
            </motion.button>

            {/* Видео */}
            <div className="aspect-video bg-black relative w-full">
              <VideoPlayer
                src={previewProject.videoUrl!}
                poster={previewProject.screenshots[0]}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>

            {/* Контент */}
            <div className="p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">
                    {previewProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {previewProject.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ссылки */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {previewProject.link && (
                    <a
                      href={previewProject.link}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg"
                    >
                      Live Preview
                    </a>
                  )}

                  {previewProject.gitHubLink && (
                    <a
                      href={previewProject.gitHubLink}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-medium rounded-lg"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Описание */}
              <div className="mb-8">
                <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  О проекте
                </h3>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewProject.description}
                  </p>
                </div>
              </div>

              {/* Скриншоты: Добавлена прокрутка для мобильных */}
              <div className="flex gap-4 overflow-x-auto pb-4 px-1 no-scrollbar -mx-1">
                {previewProject.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative shrink-0 w-32 h-20 sm:w-40 sm:h-24 rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                    onClick={() => openScreenshotModal(index)}
                  >
                    <img
                      loading="lazy"
                      src={screenshot}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Полноэкранный просмотр скриншота */}
      <AnimatePresence>
        {isScreenshotModalOpen && selectedScreenshotIndex !== null && previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeScreenshotModal}
            className="fixed inset-0 z-[110] flex items-center justify-center p-2 bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            <div
              className="relative max-w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeScreenshotModal}
                className="absolute -top-12 right-0 text-white text-3xl"
              >
                ✕
              </button>

              {/* Навигация (скрыта на очень маленьких экранах или уменьшена) */}
              <button
                onClick={goToPreviousScreenshot}
                className="absolute left-2 sm:-left-16 p-2 bg-white/10 rounded-full text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <img
                src={previewProject.screenshots[selectedScreenshotIndex]}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              <button
                onClick={goToNextScreenshot}
                className="absolute right-2 sm:-right-16 p-2 bg-white/10 rounded-full text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default Modal;
