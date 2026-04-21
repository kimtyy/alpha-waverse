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
      <div className="fixed top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-50 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-1 border-l-2 border-primary pointer-events-auto cursor-default w-full md:w-auto justify-between md:justify-start"
        >
          <div className="flex items-center gap-2 text-primary/50">
            <Cpu size={12} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Asset Accumulation</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-2xl font-black tabular-nums tracking-tighter">
              {minedShares.toFixed(4)}
            </span>
            <span className="text-[8px] md:text-[10px] font-bold text-primary">α SHARES</span>
          </div>
        </motion.div>

        <div className="flex gap-1 md:gap-2 pointer-events-auto w-full md:w-auto justify-center">
          {[
            { id: 'RADAR', label: 'Radar', icon: Globe, color: 'primary' },
            { id: 'MARKET', label: 'Market', icon: ShoppingBag, color: 'secondary' },
            { id: 'LIBRARY', label: 'My Node', icon: Library, color: 'white' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`premium-glass px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 md:gap-2 flex-1 md:flex-none justify-center ${
                view === tab.id 
                  ? `bg-${tab.color}/20 text-${tab.color} border-${tab.color}/30` 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <tab.icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">{tab.label.charAt(0)}</span>
            </button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 border-r-2 border-secondary pointer-events-auto cursor-default w-full md:w-auto justify-between md:justify-end"
        >
          <div className="flex items-center gap-2 text-secondary/50 order-2 md:order-1">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Connectivity</span>
            <TrendingUp size={12} />
          </div>
          <div className="flex items-baseline gap-2 order-1 md:order-2">
            <span className="text-lg md:text-xl font-black tabular-nums lowercase">
              {hashPower.toFixed(1)} EH/s
            </span>
            <Zap size={12} className="text-secondary animate-pulse" />
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center pt-48 md:pt-32 px-4 md:px-0">
        
        <AnimatePresence mode="wait">
          {view === 'RADAR' && (
            <motion.div 
              key="radar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.2em] md:tracking-[0.3em] bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent uppercase leading-tight mb-4">
                  ALPHA WAVE
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 opacity-40">
                  <div className="flex items-center gap-1.5 ring-1 ring-white/10 px-3 py-1 rounded-full text-primary">
                    <Globe size={10} />
                    <span className="text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">Network Sovereignty Active</span>
                  </div>
                  <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.4em]">The Next Evolution of Sound</p>
                </div>
              </div>

              <div className="relative w-full max-w-3xl group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
                <div className="relative flex items-center bg-white/[0.02] border-b-2 border-white/5 focus-within:border-primary/50 transition-all">
                  <Search className="absolute left-6 text-white/10 group-focus-within:text-primary/50 transition-colors w-5 h-5 md:w-7 md:h-7" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="가치를 발견하고 상생의 파동에 동참하십시오" 
                    className="w-full bg-transparent py-6 md:py-10 px-12 md:px-16 text-lg md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Radar Search Results */}
              <div className="w-full max-w-3xl flex flex-col gap-3">
                {filteredResults.map((result) => (
                  <motion.div 
                    key={result.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setActiveTrack(result)}
                    className="premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <MusicIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl">{result.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest">{result.category}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[10px] font-bold opacity-30 lowercase">{result.peerId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Activity size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Connected</span>
                      </div>
                      <span className="text-[8px] font-bold">Signal Strength 98%</span>
                    </div>
                  </motion.div>
                ))}
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
                        <button 
                          onClick={() => handleAcquire(item)}
                          disabled={ownedAssets.includes(item.id)}
                          className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            ownedAssets.includes(item.id)
                              ? 'bg-white/10 text-white/30 cursor-not-allowed'
                              : 'bg-white/5 hover:bg-secondary text-white hover:text-black'
                          }`}
                        >
                          {ownedAssets.includes(item.id) ? 'Acquired' : 'Acquire'}
                        </button>
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
                {/* My Waves - Creations & Acquisitions */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <PlusCircle size={18} className="text-primary" />
                      <h3 className="text-sm font-black uppercase tracking-widest">My Waves & Assets</h3>
                    </div>
                    <span className="text-[10px] font-bold opacity-30 tracking-widest">{ownedAssets.length} ASSETS</span>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {/* Render Owned Market Items */}
                    {ALPHA_MARKET_DATA.filter(item => ownedAssets.includes(item.id)).map(item => (
                      <div key={item.id} className="premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-primary/5 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Database size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{item.name}</p>
                            <p className="text-[8px] font-black opacity-30 uppercase tracking-widest">Acquired Node • Registered</p>
                          </div>
                        </div>
                        <Share2 size={16} className="opacity-20 hover:opacity-100 cursor-pointer" />
                      </div>
                    ))}

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

      {/* Global Alpha Player HUD */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-8 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto premium-glass p-4 rounded-[32px] border border-primary/20 pointer-events-auto flex flex-col md:flex-row items-center gap-6 shadow-[0_-20px_50px_rgba(0,242,255,0.1)]">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary relative overflow-hidden group">
                  <MusicIcon size={32} />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/10 rounded-full"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xl font-bold truncate">{activeTrack.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{activeTrack.category}</span>
                    <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">Node: {activeTrack.peerId}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Controls Simulation */}
              <div className="flex-1 w-full flex flex-col gap-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 180, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_15px_rgba(0,242,255,0.5)]"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold opacity-30 tabular-nums">
                  <span>02:14</span>
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <Radio size={10} />
                    <span className="uppercase tracking-widest">Validating Stream...</span>
                  </div>
                  <span>03:45</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveTrack(null)}
                  className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                >
                  <PlusCircle size={20} className="rotate-45" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
