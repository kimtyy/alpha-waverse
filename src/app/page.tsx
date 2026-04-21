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

  // Simulate Real-time Asset Accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMinedShares(prev => prev + Math.random() * 0.0001);
      setHashPower(prev => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    return WAVE_QUERY_DATA.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 6);
  }, [search]);

  return (
    <main className="min-h-[100dvh] bg-black text-white selection:bg-primary/30 flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Background Aura Waves */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] bg-primary/10 blur-[180px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05], rotate: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Diplomatic Executive HUD */}
      <div className="fixed top-8 left-8 right-8 z-50 flex flex-wrap justify-between items-start gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-6 py-4 rounded-2xl flex flex-col gap-1 border-l-2 border-primary pointer-events-auto cursor-default"
        >
          <div className="flex items-center gap-2 text-primary/50">
            <Cpu size={12} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Asset Accumulation</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tabular-nums tracking-tighter">
              {minedShares.toFixed(4)}
            </span>
            <span className="text-[10px] font-bold text-primary">α SHARES</span>
          </div>
        </motion.div>

        <div className="flex gap-2 pointer-events-auto">
          {[
            { id: 'RADAR', label: 'Radar', icon: Globe, color: 'primary' },
            { id: 'MARKET', label: 'Market', icon: ShoppingBag, color: 'secondary' },
            { id: 'LIBRARY', label: 'My Node', icon: Library, color: 'white' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`premium-glass px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                view === tab.id 
                  ? `bg-${tab.color}/20 text-${tab.color} border-${tab.color}/30` 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-6 py-4 rounded-2xl flex flex-col items-end gap-1 border-r-2 border-secondary pointer-events-auto cursor-default"
        >
          <div className="flex items-center gap-2 text-secondary/50">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Global Connectivity Power</span>
            <TrendingUp size={12} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black tabular-nums">
              {hashPower.toFixed(1)} EH/s
            </span>
            <Zap size={12} className="text-secondary animate-pulse" />
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center pt-32">
        
        <AnimatePresence mode="wait">
          {view === 'RADAR' && (
            <motion.div 
              key="radar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-col items-center mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-black tracking-[0.3em] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent uppercase leading-tight mb-4">
                  ALPHA WAVE
                </h1>
                <div className="flex items-center gap-4 opacity-40">
                  <div className="flex items-center gap-1.5 ring-1 ring-white/10 px-3 py-1 rounded-full text-primary">
                    <Globe size={10} />
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Network Sovereignty Active</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">The Next Evolution of Sound</p>
                </div>
              </div>

              <div className="relative w-full max-w-3xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
                <div className="relative flex items-center bg-white/[0.02] border-b-2 border-white/5 focus-within:border-primary/50 transition-all">
                  <Search className="absolute left-6 text-white/10 group-focus-within:text-primary/50 transition-colors" size={28} />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="가치를 발견하고 상생의 파동에 동참하십시오" 
                    className="w-full bg-transparent py-10 px-16 text-2xl md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {view === 'MARKET' && (
            <motion.div 
              key="market-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <div className="flex flex-col items-center mb-12 text-center">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="text-secondary" size={24} />
                  <h2 className="text-3xl font-black tracking-[0.2em] uppercase">Alpha Market</h2>
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Exchange your accumulated shares for exclusive assets</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
                {ALPHA_MARKET_DATA.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="premium-glass p-8 rounded-[32px] border border-white/5 hover:border-secondary/40 transition-all group relative overflow-hidden"
                  >
                    <div className="flex flex-col h-full justify-between gap-8">
                      <div>
                        <span className="text-[8px] font-black text-secondary/50 uppercase tracking-widest mb-2 block">{item.type}</span>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{item.name}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black">{item.price.toFixed(1)}</span>
                          <span className="text-[10px] font-black text-secondary grayscale opacity-50 uppercase tracking-widest">α</span>
                        </div>
                        <button className="bg-white/5 hover:bg-secondary text-white hover:text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Acquire</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'LIBRARY' && (
            <motion.div 
              key="library-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-5xl mx-auto"
            >
              <div className="flex flex-col items-center mb-16 text-center">
                <div className="flex items-center gap-3 mb-4">
                  <Library className="text-white" size={24} />
                  <h2 className="text-3xl font-black tracking-[0.2em] uppercase">My Alpha Node</h2>
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Personal Wave Archive & Asset Proof</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* My Waves - Creations */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <PlusCircle size={18} className="text-primary" />
                      <h3 className="text-sm font-black uppercase tracking-widest">My Waves</h3>
                    </div>
                    <span className="text-[10px] font-bold opacity-30 tracking-widest">2 ASSETS</span>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-primary/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <MusicIcon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Rainy Blues Symphony</p>
                          <p className="text-[8px] font-black opacity-30 uppercase tracking-widest">Created 2d ago • 812 Shares Mined</p>
                        </div>
                      </div>
                      <Share2 size={16} className="opacity-20 hover:opacity-100 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* My Echoes - History */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-secondary" />
                      <h3 className="text-sm font-black uppercase tracking-widest">My Echoes</h3>
                    </div>
                    <span className="text-[10px] font-bold opacity-30 tracking-widest">RECENT</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-secondary/5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <Activity size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Midnight Jazz Flow</p>
                          <p className="text-[8px] font-black opacity-30 uppercase tracking-widest">Listened today • +0.002 Contribution</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Hub Footer */}
        {!search && view === 'RADAR' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="mt-24 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-24 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
              <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/50">1st Halving in 342 Days</p>
              <div className="w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>

    </main>
  );
}
