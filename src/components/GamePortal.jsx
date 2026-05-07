import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, RotateCcw } from "lucide-react";

export default function GamePortal({ game, onClose }) {
  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#020205]/98 flex flex-col backdrop-blur-xl"
        id="game-portal-overlay"
      >
        <div className="flex items-center justify-between px-8 h-16 bg-[#0a0a14] border-b border-indigo-900/30 shadow-2xl">
          <div className="flex items-center gap-6">
            <button
              onClick={onClose}
              className="group p-2 bg-indigo-600/10 hover:bg-indigo-600 rounded-lg transition-all text-indigo-400 hover:text-white"
              id="close-portal-btn"
            >
              <X size={20} />
            </button>
            <div>
              <h2 className="text-white font-black uppercase tracking-tighter text-lg leading-none">{game.title}</h2>
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-[0.2em] mt-1 font-mono">
                SECURE SANDBOX ACTIVE
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const iframe = document.getElementById('game-iframe');
                if (iframe) iframe.src = iframe.src;
              }}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
              title="Reset Instance"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              className="px-6 py-2 bg-indigo-600 text-white text-[10px] font-black rounded uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              onClick={() => {
                const iframe = document.getElementById('game-iframe');
                if (iframe?.requestFullscreen) {
                  iframe.requestFullscreen().catch(err => {
                    console.error("Fullscreen failed", err);
                  });
                }
              }}
            >
              <Maximize2 size={14} />
              Maximize
            </button>
          </div>
        </div>

        <div className="flex-1 w-full bg-black relative p-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          <iframe
            id="game-iframe"
            src={game.url}
            className="w-full h-full border-none rounded-lg shadow-[0_0_50px_rgba(0,0,0,1)] bg-neutral-900"
            allow="autoplay; fullscreen; keyboard; gamepad"
            referrerPolicy="no-referrer"
            title={game.title}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
