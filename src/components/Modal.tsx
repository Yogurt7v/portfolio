import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from './Portfolio';
import VideoPlayer from './VideoPlayer';

interface ModalProps {
  previewProject: Project | null;
  setPreviewProject: (a: any) => void;
}

const Modal: React.FC<ModalProps> = ({ previewProject, setPreviewProject }) => {
  return (
    <AnimatePresence>
      {previewProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Закрытие при клике на оверлей (фон)
          onClick={() => setPreviewProject(null)}
          className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            // Останавливаем всплытие клика, чтобы модалка не закрывалась при нажатии на само видео
            onClick={(e) => e.stopPropagation()}
            onMouseLeave={() => setPreviewProject(null)}
            className="relative bg-slate-900 border border-white/20 rounded-[2.5rem] overflow-hidden w-full max-w-4xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
          >
            {/* Кнопка закрытия ВНУТРИ div */}
            <button
              onClick={() => setPreviewProject(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all group"
            >
              <span className="text-white text-xl transition-transform group-hover:rotate-90 duration-300">
                ✕
              </span>
            </button>

            <div className="aspect-video bg-black relative">
              <div className="w-full mb-8">
                <VideoPlayer
                  src={previewProject.videoUrl!}
                  poster={previewProject.screenshots[0]}
                  className="aspect-video shadow-2xl border border-white/10"
                />
              </div>

              {/* Информация внизу */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black via-black/60 to-transparent">
                <h2 className="text-3xl font-bold text-white">{previewProject.title}</h2>
                {previewProject.link && (
                  <div className="flex items-center gap-2 mt-2 text-blue-400">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    <a
                      href={previewProject.link}
                      className="text-sm font-medium uppercase tracking-wider"
                    >
                      Live Preview
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
