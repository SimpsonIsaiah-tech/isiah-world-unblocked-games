import React from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-[#121222] border border-white/5 overflow-hidden cursor-pointer rounded-2xl shadow-2xl transition-all duration-300"
      id={`game-card-${game.id}`}
      onClick={() => onSelect(game)}
    >
      <div className="aspect-video w-full bg-[#0a0a14] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent z-10" />
        
        {/* Placeholder Thumbnail Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-transform duration-700 group-hover:scale-110">
          <span className="text-indigo-400 font-black uppercase tracking-tighter text-4xl select-none leading-none text-center">
            {game.title}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20 transition-opacity duration-300">
           <div className="bg-white text-indigo-900 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             Play Now
           </div>
        </div>
      </div>
      
      <div className="p-4 relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
            {game.category}
          </span>
          <span className="text-[9px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-bold">
            9.5/10
          </span>
        </div>
        <h3 className="text-slate-100 font-bold group-hover:text-white transition-colors text-sm uppercase tracking-tight">
          {game.title}
        </h3>
        <p className="text-slate-500 text-[10px] mt-1 line-clamp-1 font-medium">
          {game.description}
        </p>
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/30 rounded-2xl transition-all pointer-events-none shadow-[inset_0_0_20px_rgba(99,102,241,0)] group-hover:shadow-[inset_0_0_20px_rgba(99,102,241,0.1)]" />
    </motion.div>
  );
}
