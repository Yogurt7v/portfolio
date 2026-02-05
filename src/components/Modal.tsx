import { useState } from 'react';
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
          // Закрытие при клике на оверлей (фон)
          onClick={() => setPreviewProject(null)}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl cursor-zoom-out overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/20 rounded-4xl overflow-hidden w-full max-w-5xl shadow-2xl shadow-black/50 cursor-default my-auto"
          >
            {/* Кнопка закрытия ВНУТРИ div */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setPreviewProject(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all group hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white text-xl transition-transform group-hover:rotate-90 duration-300">
                ✕
              </span>
            </motion.button>

            {/* Видео вверху */}
            <div className="aspect-video bg-black relative">
              <VideoPlayer
                src={previewProject.videoUrl!}
                poster={previewProject.screenshots[0]}
                className="aspect-video w-full h-full object-cover"
              />

              {/* Градиентный оверлей снизу видео */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent" />
            </div>

            {/* Контент под видео */}
            <div className="p-6 sm:p-8">
              {/* Заголовок и мета-информация */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {previewProject.title}
                  </h2>

                  {/* Технологии */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {previewProject.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1 text-xs font-medium bg-linear-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-full"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ссылки */}
                <div className="flex flex-wrap gap-3">
                  {previewProject.link && (
                    <motion.a
                      href={previewProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-medium rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Preview
                    </motion.a>
                  )}

                  {previewProject.gitHubLink && (
                    <motion.a
                      href={previewProject.gitHubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </motion.a>
                  )}
                </div>
              </div>
              {/* Описание проекта */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  О проекте
                </h3>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewProject.description}
                  </p>
                </div>
              </motion.div>
              {/* Скриншоты */}
              <div className="flex gap-4 pb-2 px-4">
                {previewProject.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.2,
                      y: -20,
                      zIndex: 50,
                    }}
                    transition={{
                      type: 'tween',
                      stiffness: 350,
                      damping: 25,
                      mass: 0.7,
                    }}
                    className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden border border-white/10
                 cursor-pointer origin-left hover:shadow-2xl hover:shadow-black/80
                 hover:overflow-visible group"
                    style={{ transformOrigin: 'left center' }}
                    onClick={() => openScreenshotModal(index)}
                  >
                    <img
                      src={screenshot}
                      alt={`Скриншот ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Full-size modal */}
      <AnimatePresence>
        {isScreenshotModalOpen && selectedScreenshotIndex !== null && previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeScreenshotModal}
            className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-full"
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                onClick={closeScreenshotModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all group hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white text-xl transition-transform group-hover:rotate-90 duration-300">
                  ✕
                </span>
              </motion.button>

              {/* Previous button */}
              {previewProject.screenshots.length > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={goToPreviousScreenshot}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all group hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                </motion.button>
              )}

              {/* Next button */}
              {previewProject.screenshots.length > 1 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={goToNextScreenshot}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all group hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                </motion.button>
              )}

              {/* Image */}
              <motion.img
                key={selectedScreenshotIndex}
                src={previewProject.screenshots[selectedScreenshotIndex]}
                alt={`Скриншот ${selectedScreenshotIndex + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-md">
                {selectedScreenshotIndex + 1} / {previewProject.screenshots.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default Modal;
