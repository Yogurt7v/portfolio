import React from 'react';
import SkeletonCard from '../../components/SkeletonCard';

interface ProjectsSkeletonProps {
  slideWidth: number;
}

const ProjectsSkeleton: React.FC<ProjectsSkeletonProps> = ({ slideWidth }) => {
  return (
    <section className="w-full py-12 max-w-6xl mx-auto px-4" id="projects">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="order-2 md:order-1">
          <div className="h-12 bg-slate-800/50 rounded-full animate-pulse" />
        </div>
        <div className="order-1 md:order-2 relative p-4 sm:p-8 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-4xl md:rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="flex gap-6 pb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="shrink-0" style={{ width: slideWidth }}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
