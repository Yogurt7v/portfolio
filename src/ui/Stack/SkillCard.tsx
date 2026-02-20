import React from 'react';
import { motion } from 'framer-motion';
import { getSkillColor } from '../../data/skills';
import { itemVariants } from '../../utils/animations';

interface SkillCardProps {
  name: string;
  level: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
      className="p-4 rounded-2xl bg-white/3 border border-white/10 flex flex-col items-center justify-center -3 hover:bg-white/5 transition-all"
    >
      <div
        className={`text-2xl font-black mb-2 transition-transform group-hover:scale-110 ${getSkillColor(name)}`}
      >
        {name}
      </div>
      <div className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold">
        {level}
      </div>
    </motion.div>
  );
};

export default SkillCard;
