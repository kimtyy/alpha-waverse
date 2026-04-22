"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Activity, Music as MusicIcon, ArrowRight, Radio, Cpu, 
  Database, TrendingUp, Zap, ShoppingBag, Globe, Library, PlusCircle,
  Clock, Share2
} from 'lucide-react';
import { WAVE_QUERY_DATA, SearchResult } from '@/data/omni-search';
import { ALPHA_MARKET_DATA, MarketItem } from '@/data/market';

export default function AlphaWaveGlobalEngine() {
  const [search, setSearch] = useState('');
  const [minedShares, setMinedShares] = useState(124.5928);
  const [hashPower, setHashPower] = useState(84.2);
  const [view, setView] = useState<'RADAR' | 'MARKET' | 'LIBRARY'>('RADAR');

  const [activeTrack, setActiveTrack] = useState<SearchResult | null>(null);
  const [ownedAssets, setOwnedAssets] = useState<string[]>(['hwb-vol-1', 'haerin-demo-1']);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Play audio when track changes
  useEffect(() => {
    if (activeTrack && audioRef.current) {
      audioRef.current.src = activeTrack.url;
      audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
    } else if (!activeTrack && audioRef.current) {
      audioRef.current.pause();
    }
  }, [activeTrack]);

  // Simulate Real-time Asset Accumulation with Proof-of-Flow
  useEffect(() => {
    const interval = setInterval(() => {
      // Base mining + bonus if activeTrack is playing (Proof-of-Flow)
      const miningBonus = activeTrack ? 0.0003 : 0.0001;
      setMinedShares(prev => prev + Math.random() * miningBonus);
      setHashPower(prev => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTrack]);

  const handleAcquire = (item: MarketItem) => {
    if (minedShares >= item.price) {
      setMinedShares(prev => prev - item.price);
      setOwnedAssets(prev => [...prev, item.id]);
      alert(`[TRANSACTION CONFIRMED] ${item.name} has been decentralized to your node.`);
    } else {
      alert(`[INSUFFICIENT SHARES] You need ${(item.price - minedShares).toFixed(2)} more α to acquire this asset.`);
    }
  };

  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    return WAVE_QUERY_DATA.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6);
  }, [search]);
  return (
    <main className="h-[100dvh] w-full bg-black text-white selection:bg-primary/30 flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background Aura Waves */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] bg-primary/10 blur-[180px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full"
        />
      </div>

      {/* FIXED TOP HUD: Simplified & Minimal */}
      <div className="w-full z-50 px-6 pt-6 md:pt-10 flex flex-col items-center gap-4">
        <div className="w-full max-w-5xl flex justify-between items-center">
          {/* Sovereign Wealth */}
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-primary/60">Sovereign Wealth</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm md:text-lg font-black tabular-nums">{minedShares.toFixed(4)}</span>
              <span className="text-[7px] md:text-[8px] font-bold text-primary">α</span>
            </div>
          </div>

          {/* Simple Toggle: Radar / My Node */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {[
              { id: 'RADAR', label: 'RADAR', icon: Globe },
              { id: 'LIBRARY', label: 'MY NODE', icon: Library }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setView(tab.id as any); setSearch(''); }}
                className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  view === tab.id 
                    ? 'bg-white text-black shadow-xl' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <tab.icon className="w-2.5 h-2.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Network Power */}
          <div className="flex flex-col items-end gap-0.5 text-right">
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-secondary/60">Network</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm md:text-lg font-black tabular-nums">{hashPower.toFixed(1)}</span>
              <Zap size={10} className="text-secondary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Global Partner Status - Subtle */}
        <div className="flex items-center gap-2 opacity-30">
          <div className="w-1 h-1 rounded-full bg-green-500" />
          <span className="text-[6px] font-black uppercase tracking-[0.3em]">TuneCore Global Active Hub</span>
        </div>
      </div>

      {/* MAIN VIEWPORT: Fixed 100vh with Internal Scroll */}
      <div className="flex-1 w-full max-w-4xl relative z-10 flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {view === 'RADAR' && (
            <motion.div 
              key="radar-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative"
            >
              {/* Dynamic Center Title & Search Bar: Hides when results appear */}
              {(!search || filteredResults.length === 0) && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-8 md:gap-12 w-full mb-20 px-4"
                >
                  <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] uppercase bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none text-center pl-[0.3em]">
                    ALPHA WAVERS
                  </h1>
                  <div className="relative w-full max-w-2xl group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-white/[0.03] border-b border-white/10 focus-within:border-primary transition-all">
                      <Search className="absolute left-4 text-white/20 group-focus-within:text-primary w-5 h-5 md:w-6 md:h-6" />
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="Search AI Sovereign Sounds..." 
                        className="w-full bg-transparent py-6 md:py-8 px-12 md:px-14 text-lg md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Internal Scrollable Results: Appears only when searching */}
              {search && filteredResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex flex-col pt-10"
                >
                  <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Discoveries</h2>
                    <button onClick={() => setSearch('')} className="text-[8px] font-black uppercase text-white/40 hover:text-white transition-colors">Clear Search</button>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-40">
                    {filteredResults.map((result) => (
                      <motion.div 
                        key={result.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => setActiveTrack(result)}
                        className={`premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group transition-all ${activeTrack?.id === result.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-white/5'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTrack?.id === result.id ? 'bg-primary text-black' : 'bg-primary/10 text-primary group-hover:scale-105'}`}>
                            {activeTrack?.id === result.id ? <Activity size={20} className="animate-pulse" /> : <MusicIcon size={20} />}
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-bold text-base md:text-xl truncate tracking-tight">{result.title}</h3>
                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                              <span className="text-primary/70">{result.category}</span>
                              <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                              <span>{result.isrc}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[7px] font-black uppercase tracking-tighter text-green-400">
                            {result.status}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'LIBRARY' && (
            <motion.div 
              key="library-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col pt-10 overflow-hidden"
            >
              <div className="flex items-center justify-center gap-4 mb-10">
                <Library className="text-white/20" size={20} />
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase">My Alpha Node</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-40">
                {ALPHA_MARKET_DATA.filter(item => ownedAssets.includes(item.id)).map(item => (
                  <div key={item.id} className="premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                        <Database size={20} />
                      </div>
                      <div>
                        <p className="text-base font-black group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-[8px] font-black opacity-30 uppercase tracking-widest">P2P Registered • Verified</p>
                      </div>
                    </div>
                    <Share2 size={16} className="opacity-20 hover:opacity-100 cursor-pointer hover:text-primary transition-all" />
                  </div>
                ))}
                {ownedAssets.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4">
                    <Zap size={40} strokeWidth={1} />
                    <p className="text-xs font-black uppercase tracking-widest">No Node Assets Acquired</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SPATIAL VISUALIZER: Floating Above Player */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-32 left-0 right-0 z-40 flex items-end justify-center gap-[2px] md:gap-1 pointer-events-none px-10"
          >
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [10, Math.random() * 60 + 10, 10],
                }}
                transition={{ duration: 0.3 + Math.random() * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 md:w-1 rounded-full bg-gradient-to-t from-primary/40 to-secondary/40"
                style={{ filter: `hue-rotate(${i * 8}deg)` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CEO PLAYER HUD: Fixed Bottom, No Overlap */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div 
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-8"
          >
            <div className="max-w-4xl mx-auto premium-glass p-5 rounded-[32px] border border-primary/30 flex items-center gap-6 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <div className="flex items-center gap-4 flex-1 overflow-hidden">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary relative shadow-inner overflow-hidden">
                  <MusicIcon size={24} />
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm md:text-lg font-black truncate tracking-tighter">{activeTrack.title}</h4>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-50">
                    <span className="text-primary">{activeTrack.isrc}</span>
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span>{activeTrack.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTrack(null)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white transition-all"
                >
                  <PlusCircle size={20} className="rotate-45" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Engine */}
      <audio ref={audioRef} className="hidden" />

    </main>
  );
}
