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
    <main className="min-h-[100dvh] bg-black text-white selection:bg-primary/30 flex flex-col items-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Aura Waves - Deep Space Aesthetic */}
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

      {/* CEO Executive HUD - Strategic Status */}
      <div className="fixed top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 z-50 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 pointer-events-none">
        
        {/* Left: Asset & Superfan Metrics */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-1 border-l-2 border-primary pointer-events-auto cursor-default w-full md:w-auto justify-between md:justify-start"
        >
          <div className="flex items-center gap-2 text-primary/50">
            <Cpu size={12} />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Sovereign Wealth</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-2xl font-black tabular-nums tracking-tighter">
              {minedShares.toFixed(4)}
            </span>
            <span className="text-[8px] md:text-[10px] font-bold text-primary">α SHARES</span>
          </div>
          <div className="hidden md:flex items-center gap-2 mt-1 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[8px] font-bold uppercase tracking-widest">Superfan Level: Master Node</span>
          </div>
        </motion.div>

        {/* Center: Strategic Navigation */}
        <div className="flex flex-col items-center gap-2 pointer-events-auto">
          <div className="flex gap-1 md:gap-2 justify-center">
            {[
              { id: 'RADAR', label: 'Global Radar', icon: Globe, color: 'primary' },
              { id: 'MARKET', label: 'Alpha Market', icon: ShoppingBag, color: 'secondary' },
              { id: 'LIBRARY', label: 'My Node', icon: Library, color: 'white' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setView(tab.id as any)}
                className={`premium-glass px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 md:gap-2 flex-1 md:flex-none justify-center ${
                  view === tab.id 
                    ? `bg-${tab.color}/20 text-${tab.color} border-${tab.color}/30 shadow-[0_0_25px_rgba(0,0,0,0.7)]` 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <tab.icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="hidden xs:inline">{tab.label}</span>
                <span className="xs:hidden">{tab.label.charAt(0)}</span>
              </button>
            ))}
          </div>
          {/* Global Distribution Status */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40">Partner: <span className="text-white">TuneCore Global Active</span></span>
          </motion.div>
        </div>

        {/* Right: Network & P2P Status */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="premium-glass px-4 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 border-r-2 border-secondary pointer-events-auto cursor-default w-full md:w-auto justify-between md:justify-end"
        >
          <div className="flex items-center gap-2 text-secondary/50 order-2 md:order-1">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">P2P Mesh Power</span>
            <TrendingUp size={12} />
          </div>
          <div className="flex items-baseline gap-2 order-1 md:order-2">
            <span className="text-lg md:text-xl font-black tabular-nums lowercase">
              {hashPower.toFixed(1)} PH/s
            </span>
            <Zap size={12} className="text-secondary animate-pulse" />
          </div>
        </motion.div>
      </div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center pt-48 md:pt-40 px-4 md:px-0">
        
        <AnimatePresence mode="wait">
          {view === 'RADAR' && (
            <motion.div 
              key="radar-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              {/* Premium Spatial Visualizer - 2026 Core Tech */}
              <div className="w-full max-w-4xl h-40 mb-16 flex items-end justify-center gap-[2px] md:gap-1 relative group">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                {[...Array(60)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: activeTrack ? [10, Math.random() * 100 + 10, 10] : 2,
                      opacity: activeTrack ? 1 : 0.05
                    }}
                    transition={{ 
                      duration: 0.3 + Math.random() * 0.4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-0.5 md:w-1 rounded-full ${activeTrack ? 'bg-gradient-to-t from-primary to-secondary' : 'bg-white'}`}
                    style={{ 
                      boxShadow: activeTrack ? '0 0 15px var(--primary)' : 'none',
                      filter: `hue-rotate(${i * 6}deg) saturate(1.5)`
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-[0.2em] md:tracking-[0.4em] bg-gradient-to-b from-white via-white to-white/10 bg-clip-text text-transparent uppercase leading-none mb-6">
                  ALPHA WAVE
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 opacity-60">
                  <div className="flex items-center gap-2 ring-1 ring-white/20 px-4 py-1.5 rounded-full text-primary bg-primary/5">
                    <Globe size={12} />
                    <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">P2P Mainnet Live</span>
                  </div>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] md:tracking-[0.5em]">Defining the Sovereign Sound Economy</p>
                </div>
              </div>

              <div className="relative w-full max-w-3xl group mb-12">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
                <div className="relative flex items-center bg-white/[0.03] border-b-2 border-white/10 focus-within:border-primary transition-all">
                  <Search className="absolute left-6 text-white/20 group-focus-within:text-primary transition-colors w-6 h-6 md:w-8 md:h-8" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Search for Provenance-Certified AI Waves" 
                    className="w-full bg-transparent py-8 md:py-12 px-14 md:px-18 text-xl md:text-4xl font-bold focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Radar Search Results with Provenance Badges */}
              <div className="w-full max-w-3xl flex flex-col gap-4">
                {filteredResults.map((result) => (
                  <motion.div 
                    key={result.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setActiveTrack(result)}
                    className="premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between cursor-pointer group hover:bg-primary/5 transition-all relative overflow-hidden"
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                        <MusicIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-xl md:text-2xl tracking-tighter">{result.title}</h3>
                          <div className="px-2 py-0.5 rounded-md bg-primary/20 border border-primary/30 flex items-center gap-1">
                            <Zap size={8} className="text-primary" />
                            <span className="text-[7px] font-black uppercase text-primary tracking-tighter">AI-PROVENANCE</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest">{result.category}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[10px] font-bold text-white/30 tracking-tight">ISRC: {result.isrc}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[10px] font-black text-green-500/60 uppercase tracking-tighter">{result.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity relative z-10 text-right">
                      <div className="flex items-center gap-1.5 text-primary">
                        <Activity size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Hi-Fi Spatial</span>
                      </div>
                      <span className="text-[9px] font-black text-white/40 mt-1 uppercase tracking-tighter">TuneCore Certified Distribution</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
              <div className="flex flex-col items-center mb-16 text-center">
                <div className="flex items-center gap-4 mb-4">
                  <ShoppingBag className="text-secondary" size={32} />
                  <h2 className="text-4xl font-black tracking-[0.2em] uppercase">Alpha Market</h2>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Direct Access to Decentralized AI IP & Nodes</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
                {ALPHA_MARKET_DATA.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    className="premium-glass p-10 rounded-[40px] border border-white/5 hover:border-secondary/40 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[300px]"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-4 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[9px] font-black text-secondary uppercase tracking-widest">{item.type}</span>
                        <TrendingUp className="text-white/10 group-hover:text-secondary/50 transition-colors" size={24} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-secondary transition-colors leading-tight">{item.name}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed font-medium mb-8 max-w-md">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black tabular-nums">{item.price.toFixed(1)}</span>
                        <span className="text-xs font-black text-secondary uppercase tracking-widest opacity-60">α SHARES</span>
                      </div>
                      <button 
                        onClick={() => handleAcquire(item)}
                        disabled={ownedAssets.includes(item.id)}
                        className={`px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                          ownedAssets.includes(item.id)
                            ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                            : 'bg-white text-black hover:bg-secondary hover:text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-secondary/30'
                        }`}
                      >
                        {ownedAssets.includes(item.id) ? 'Locked in Node' : 'Acquire IP'}
                      </button>
                    </div>
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-secondary/5 blur-[80px] rounded-full group-hover:bg-secondary/10 transition-all" />
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
                <div className="flex items-center gap-4 mb-4">
                  <Library className="text-white" size={32} />
                  <h2 className="text-4xl font-black tracking-[0.2em] uppercase">My Alpha Node</h2>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em]">Personal Provenance Vault & P2P History</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* My Waves - Creations & Acquisitions */}
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                      <PlusCircle size={22} className="text-primary" />
                      <h3 className="text-base font-black uppercase tracking-widest">Sovereign Assets</h3>
                    </div>
                    <span className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-black opacity-40 tracking-widest">{ownedAssets.length} ACTIVE</span>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {ALPHA_MARKET_DATA.filter(item => ownedAssets.includes(item.id)).map(item => (
                      <div key={item.id} className="premium-glass p-8 rounded-[32px] border border-white/5 flex items-center justify-between hover:bg-primary/5 transition-all group">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Database size={24} />
                          </div>
                          <div>
                            <p className="text-lg font-black group-hover:text-primary transition-colors">{item.name}</p>
                            <div className="flex items-center gap-2 opacity-40">
                              <span className="text-[10px] font-black uppercase tracking-widest">P2P Registered</span>
                              <span className="w-1 h-1 rounded-full bg-white" />
                              <span className="text-[10px] font-bold">Node verified</span>
                            </div>
                          </div>
                        </div>
                        <Share2 size={20} className="opacity-20 hover:opacity-100 cursor-pointer hover:text-primary transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Echoes - History */}
                <div className="flex flex-col gap-8">
                  <div className="flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                      <Clock size={22} className="text-secondary" />
                      <h3 className="text-base font-black uppercase tracking-widest">Stream Lineage</h3>
                    </div>
                    <span className="text-[10px] font-black opacity-30 tracking-widest">REAL-TIME</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="premium-glass p-8 rounded-[32px] border border-white/5 flex items-center justify-between hover:bg-secondary/5 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <Activity size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-black group-hover:text-secondary transition-colors">Midnight Jazz Flow</p>
                          <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Flow Contribution: +0.082 α</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
            className="mt-32 flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-32 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/60">Sovereign Sound Ecosystem v1.2</p>
              <div className="w-32 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Global CEO Audio Player HUD - The Heart of the Waverse */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-6 md:p-10 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto premium-glass p-6 md:p-8 rounded-[48px] border border-primary/30 pointer-events-auto flex flex-col lg:flex-row items-center gap-8 shadow-[0_-30px_100px_rgba(0,242,255,0.15)] backdrop-blur-3xl">
              <div className="flex items-center gap-6 flex-1">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary/20 flex items-center justify-center text-primary relative overflow-hidden group shadow-inner">
                  <MusicIcon size={40} />
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-2xl md:text-3xl font-black truncate leading-tight mb-2 tracking-tighter">{activeTrack.title}</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-0.5 rounded bg-primary text-[10px] font-black text-black uppercase tracking-widest">{activeTrack.category}</span>
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">{activeTrack.isrc}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">{activeTrack.status}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/10 text-[9px] font-bold text-white/40">
                      <Activity size={10} />
                      <span>Dolby Atmos Spatial</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Stream Analytics Simulation */}
              <div className="flex-[1.5] w-full flex flex-col gap-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 180, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_20px_rgba(0,242,255,0.6)]"
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-black tabular-nums tracking-widest">
                  <span className="text-white/40">02:14</span>
                  <div className="flex items-center gap-3 text-primary animate-pulse">
                    <Radio size={14} />
                    <span className="uppercase tracking-[0.3em]">Validating Provenance Ledger...</span>
                  </div>
                  <span className="text-white/40">03:45</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTrack(null)}
                  className="w-16 h-16 rounded-3xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 border border-white/10 hover:border-red-500/30 flex items-center justify-center transition-all shadow-xl"
                >
                  <PlusCircle size={28} className="rotate-45" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Sovereign Audio Engine */}
      <audio ref={audioRef} className="hidden" />

    </main>
  );
}
