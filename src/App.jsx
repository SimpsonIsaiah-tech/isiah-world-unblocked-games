/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Search, Gamepad2, TrendingUp, Sparkles, Trophy, Plus } from "lucide-react";
import gamesData from "./games.json";
import GameCard from "./components/GameCard";
import GamePortal from "./components/GamePortal";

const games = gamesData;

export default function App() {
  console.log("App component rendering...");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [vibrantMode, setVibrantMode] = useState(false);

  const categories = ["All", ...Array.from(new Set(games.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className={`flex flex-col h-screen ${vibrantMode ? 'bg-black text-red-500' : 'bg-black text-slate-100'} overflow-hidden font-sans select-none transition-colors duration-500`}>
      {/* Header */}
      <header className={`h-16 flex items-center justify-between px-8 ${vibrantMode ? 'bg-red-950/20 border-red-900/50' : 'bg-[#0a0a14] border-indigo-900/30'} border-b shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-20 transition-colors`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${vibrantMode ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]'} rounded-lg flex items-center justify-center transition-all`}>
            <Gamepad2 className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase animate-rainbow-text">
            Ultra Arcade
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black tracking-[0.3em] italic uppercase animate-rainbow-text">Made by Isaiah</span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ${vibrantMode ? 'bg-red-950/10 border-red-900/30 ring-red-500' : 'bg-[#151525] border-indigo-900/50 ring-indigo-500'} border rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-1 placeholder-slate-600 transition-all shadow-inner`}
            />
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${vibrantMode ? 'text-red-900' : 'text-slate-500'}`} size={16} />
          </div>
        </div>

        <nav className="flex gap-6 text-xs font-bold tracking-widest uppercase items-center">
          <a href="#" className={`${vibrantMode ? 'text-red-500 border-red-500' : 'text-indigo-400 border-indigo-400'} border-b-2 pb-1 transition-all`}>Home</a>
          <button 
            onClick={() => setVibrantMode(!vibrantMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${vibrantMode ? 'bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
          >
            <span className="text-[9px] font-black uppercase tracking-tighter">Color Change</span>
            <div className={`w-6 h-3 rounded-full relative transition-colors ${vibrantMode ? 'bg-red-400' : 'bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all ${vibrantMode ? 'left-3.5' : 'left-0.5'}`} />
            </div>
          </button>
        </nav>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-[#06060f] border-r border-indigo-900/20 p-6 flex-col gap-2 z-10 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-500 font-bold mb-4">Categories</div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-3 w-full p-2.5 rounded-lg transition-all text-sm group ${
                activeCategory === cat
                  ? "bg-indigo-600/10 text-indigo-300 border border-indigo-500/20"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <div className={`w-2 h-2 rounded-full transition-colors ${
                activeCategory === cat ? "bg-indigo-500" : "bg-slate-700 group-hover:bg-slate-500"
              }`} />
              {cat}
            </button>
          ))}

          <div className="mt-auto pt-6">
            <div className={`p-4 rounded-xl border transition-all ${vibrantMode ? 'bg-red-950/20 border-red-900/30' : 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/20'}`}>
              <div className={`text-[10px] uppercase font-bold mb-1 ${vibrantMode ? 'text-red-500' : 'text-indigo-300'}`}>Network Status</div>
              <div className="text-lg font-mono text-white flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${vibrantMode ? 'bg-red-600' : 'bg-green-500'}`} />
                9.4k Playing
              </div>
              <div className={`text-[10px] mt-2 font-mono ${vibrantMode ? 'text-red-800' : 'text-slate-500'}`}>LATENCY: 12ms</div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase italic bg-white/5 px-4 py-1 rounded-full border border-white/10 animate-rainbow-text">
                Created by Isaiah
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto scroll-smooth immersive-bg p-8">
          {/* Featured Banner (Hero alternative) */}
          {activeCategory === "All" && searchQuery === "" && (
            <div className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/10 to-transparent border border-indigo-500/10 p-12 md:p-20 shadow-2xl flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden flex items-center justify-center">
                <span className="text-[30rem] font-black opacity-10 select-none">G</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["drop-shadow(0 0 10px rgba(255,255,255,0.2))", "drop-shadow(0 0 25px rgba(255,255,255,0.4))", "drop-shadow(0 0 10px rgba(255,255,255,0.2))"]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4"
                >
                  <span className="text-9xl md:text-[12rem] font-black tracking-tighter uppercase animate-rainbow-text leading-none select-none">
                    GOD
                  </span>
                </motion.div>
                
                <div className="flex flex-col items-center gap-1">
                   <span className="text-[12px] font-black tracking-[0.5em] uppercase animate-rainbow-text text-2xl">Made by Isaiah</span>
                   <div className="h-px w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2" />
                </div>
              </div>
            </div>
          )}

          {/* Search/Category result info for mobile (since sidebar is hidden) */}
          <div className="lg:hidden flex items-center justify-between mb-6 gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white/5 border border-white/10 text-slate-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400" />
              {activeCategory} Games
            </h3>
            <div className="text-[10px] font-mono text-indigo-500/50 uppercase tracking-widest">
              {filteredGames.length} AVAILABLE TARGETS
            </div>
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onSelect={(g) => setSelectedGame(g)} 
                />
              ))
            ) : (
              <div className="col-span-full py-32 text-center">
                <Search size={48} strokeWidth={1} className="mx-auto mb-4 text-indigo-900" />
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-600">No matches found in database</p>
              </div>
            )}
          </div>
          
          <div className="h-20" /> {/* Spacer */}
        </main>
      </div>

      {/* Bottom Bar */}
      <footer className="h-8 bg-[#0a0a14] flex items-center justify-between px-8 border-t border-indigo-900/30 text-[10px] font-mono text-slate-500 uppercase tracking-widest overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            STABLE CLUSTER: US-E1
          </span>
          <span className="hidden sm:inline opacity-50">•</span>
          <span className="hidden sm:inline">DATA FEED: ACTIVE</span>
        </div>
        <div className="flex gap-8 items-center">
          <span className="hidden md:inline">Terms of Service</span>
          <span className="hidden md:inline">DMCA</span>
          <span className="text-indigo-400 font-bold">v2.1.0-ULTRA</span>
        </div>
      </footer>

      {/* Game Viewer Portal */}
      <GamePortal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
