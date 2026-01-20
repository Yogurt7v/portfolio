import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from './Portfolio';

interface ModalProps {
  previewProject: Project | null;
  setPreviewProject: (a: any) => void;
}

const Modal: React.FC<ModalProps> = ({ previewProject, setPreviewProject }) => {
  return (
    <AnimatePresence>
      {previewProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl"
        >
          <div
            onMouseLeave={() => setPreviewProject(null)} // Закрыть, если мышка ушла
            className="bg-slate-900 border border-white/20 rounded-[2.5rem] overflow-hidden w-full max-w-4xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="aspect-video bg-black relative">
              {/* Предположим, у нас есть поле videoUrl в данных */}
              <video
                src={previewProject.videoUrl || '/videos/placeholder.mp4'}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-3xl font-bold">{previewProject.title}</h2>
                <p className="text-slate-300 mt-2">Видео-презентация проекта</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
