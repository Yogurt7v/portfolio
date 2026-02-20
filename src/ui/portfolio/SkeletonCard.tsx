import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard: React.FC = () => {
  return (
    <motion.div
      className="bg-glass-white backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl"
      style={{
        height: '550px',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-slate-800 animate-pulse" />

      {/* Content placeholder */}
      <div className="p-6 flex flex-col">
        {/* Title placeholder */}
        <div className="flex justify-between items-start mb-3">
          <div className="h-6 bg-slate-700 rounded animate-pulse w-3/4" />
        </div>

        {/* Description placeholder */}
        <div className="space-y-2 mb-6 grow">
          <div className="h-4 bg-slate-700 rounded animate-pulse" />
          <div className="h-4 bg-slate-700 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-slate-700 rounded animate-pulse w-4/6" />
          <div className="h-4 bg-slate-700 rounded animate-pulse w-3/6" />
        </div>

        {/* Tech stack placeholders */}
        <div className="flex flex-wrap gap-2 mt-auto pb-4">
          <div className="h-5 bg-slate-700 rounded-full animate-pulse w-12" />
          <div className="h-5 bg-slate-700 rounded-full animate-pulse w-16" />
          <div className="h-5 bg-slate-700 rounded-full animate-pulse w-14" />
          <div className="h-5 bg-slate-700 rounded-full animate-pulse w-10" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
