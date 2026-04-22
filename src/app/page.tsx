"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Activity, Music as MusicIcon, Zap, Globe, Library, PlusCircle,
  Share2, Heart, User, Cpu, CloudUpload, Play, Pause, SkipForward
} from 'lucide-react';
import { WAVE_QUERY_DATA, SearchResult } from '@/data/omni-search';

export default function AlphaWaverseEngine() {
  // Navigation & Search State
  const [view, setView] = useState<'RADAR' | 'LIKES' | 'NODE'>('RADAR');
  const [search, setSearch] = useState('');
  
  // Playback State
  const [activeTrack, setActiveTrack] = useState<SearchResult | null>(null);
  const [playlist, setPlaylist] = useState<SearchResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // User Assets State
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  const [ownedAssets, setOwnedAssets] = useState<string[]>(['hwb-vol-1', 'haerin-demo-1']);

  // Economy Stats Simulation
  const [minedShares, setMinedShares] = useState(124.5931);
  const [hashPower, setHashPower] = useState(82.9);

  // Stats Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMinedShares(prev => prev + 0.0001);
      setHashPower(prev => prev + (Math.random() * 2 - 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Audio Playback Controller
  useEffect(() => {
    if (activeTrack && audioRef.current) {
      audioRef.current.src = activeTrack.url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Play error:", err));
    }
  }, [activeTrack]);

  // Handle Song Ended (Continuous Play)
  const handleTrackEnd = () => {
    if (playlist.length > 0 && activeTrack) {
      const currentIndex = playlist.findIndex(t => t.id === activeTrack.id);
      if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
        setActiveTrack(playlist[currentIndex + 1]);
      } else {
        setIsPlaying(false);
      }
    }
  };

  // Play All Logic
  const playAll = (tracks: SearchResult[]) => {
    if (tracks.length > 0) {
      setPlaylist(tracks);
      setActiveTrack(tracks[0]);
    }
  };

  const filteredResults = useMemo(() => {
    if (!search) return [];
    return WAVE_QUERY_DATA.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.category.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 8);
  }, [search]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <main className="h-[100dvh] w-full bg-black text-white selection:bg-primary/30 flex flex-col items-center relative overflow-hidden font-sans">
      
      {/* Background Aura */}
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

      {/* FIXED TOP HUD */}
      <div className="w-full z-50 px-6 pt-6 md:pt-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex justify-between items-center premium-glass px-5 py-3 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col items-start">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-primary/60">Sovereign Wealth</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm md:text-lg font-black tabular-nums">{minedShares.toFixed(4)}</span>
              <span className="text-[8px] font-bold text-primary">α</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[6px] font-black uppercase tracking-[0.3em]">Tunecore Hub Active</span>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-secondary/60">Network Power</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm md:text-lg font-black tabular-nums">{hashPower.toFixed(1)}</span>
              <Zap size={10} className="text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 w-full max-w-4xl relative z-10 flex flex-col items-center justify-center px-6 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {view === 'RADAR' && (
            <motion.div 
              key="radar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center relative"
            >
              {(!search || filteredResults.length === 0) && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-8 md:gap-12 w-full mb-20 px-4"
                >
                  <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] uppercase bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none text-center pl-[0.3em]">
                    ALPHA WAVERSE
                  </h1>
                  <div className="relative w-full max-w-2xl group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-white/[0.03] border-b border-white/10 focus-within:border-primary transition-all">
                      <Search className="absolute left-4 text-white/20 group-focus-within:text-primary w-5 h-5 md:w-6 md:h-6" />
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="Discover the Sound Universe..." 
                        className="w-full bg-transparent py-6 md:py-8 px-12 md:px-14 text-lg md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {search && filteredResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex flex-col pt-10"
                >
                  <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Discoveries</h2>
                    <button onClick={() => setSearch('')} className="text-[8px] font-black uppercase text-white/40 hover:text-white">Reset</button>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-48">
                    {filteredResults.map((result) => (
                      <div 
                        key={result.id}
                        onClick={() => { setActiveTrack(result); setPlaylist(filteredResults); }}
                        className={`premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group transition-all ${activeTrack?.id === result.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-white/5'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTrack?.id === result.id ? 'bg-primary text-black' : 'bg-primary/10 text-primary group-hover:scale-105'}`}>
                            {activeTrack?.id === result.id ? <Activity size={20} className="animate-pulse" /> : <MusicIcon size={20} />}
                          </div>
                          <div>
                            <h3 className="font-bold text-base md:text-xl tracking-tight">{result.title}</h3>
                            <div className="flex items-center gap-2 text-[8px] font-black uppercase opacity-40">
                              <span className="text-primary">{result.category}</span>
                              <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                              <span>{result.isrc}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={(e) => toggleLike(result.id, e)} className={`p-2 transition-all ${likedTracks.includes(result.id) ? 'text-red-500 scale-110' : 'text-white/10 hover:text-white'}`}>
                          <Heart size={20} fill={likedTracks.includes(result.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {view === 'LIKES' && (
            <motion.div 
              key="likes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col pt-10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 mb-10 text-center">
                <Heart size={32} className="text-red-500" />
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase">My Vault</h2>
                <button 
                  onClick={() => playAll(WAVE_QUERY_DATA.filter(item => likedTracks.includes(item.id)))}
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <Play size={12} fill="currentColor" /> Play All Vault
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-48">
                {WAVE_QUERY_DATA.filter(item => likedTracks.includes(item.id)).map(item => (
                  <div key={item.id} onClick={() => { setActiveTrack(item); setPlaylist(WAVE_QUERY_DATA.filter(t => likedTracks.includes(t.id))); }} className={`premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer transition-all ${activeTrack?.id === item.id ? 'bg-red-500/10 border-red-500/30' : 'hover:bg-red-500/5'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                        <MusicIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-base md:text-lg">{item.title}</p>
                        <p className="text-[8px] font-black opacity-30 uppercase">{item.isrc}</p>
                      </div>
                    </div>
                    <button onClick={(e) => toggleLike(item.id, e)} className="text-red-500"><Heart size={18} fill="currentColor" /></button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'NODE' && (
            <motion.div 
              key="node"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col pt-10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 mb-10 text-center">
                <Cpu size={32} className="text-primary" />
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase">My Studio</h2>
                <button 
                  onClick={() => playAll(WAVE_QUERY_DATA.filter(item => ownedAssets.includes(item.id)))}
                  className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  <Play size={12} fill="currentColor" /> Play My Studio
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-48">
                {WAVE_QUERY_DATA.filter(item => ownedAssets.includes(item.id)).map(item => (
                  <div key={item.id} onClick={() => { setActiveTrack(item); setPlaylist(WAVE_QUERY_DATA.filter(t => ownedAssets.includes(t.id))); }} className={`premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between transition-all cursor-pointer ${activeTrack?.id === item.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-primary/5'}`}>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <CloudUpload size={24} />
                      </div>
                      <div>
                        <p className="text-base md:text-xl font-black tracking-tight">{item.title}</p>
                        <div className="flex items-center gap-2 opacity-30 text-[10px] font-black uppercase">
                          <span>{item.status}</span>
                          <span className="w-1 h-1 rounded-full bg-white" />
                          <span>P2P Certified</span>
                        </div>
                      </div>
                    </div>
                    <Share2 size={20} className="text-white/20" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QUICK NAV BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[110] px-6 pb-6 md:pb-10 pointer-events-none">
        <div className="max-w-md mx-auto premium-glass p-2 rounded-full border border-white/10 shadow-2xl pointer-events-auto flex justify-between items-center bg-black/90 backdrop-blur-3xl">
          {[
            { id: 'LIKES', icon: Heart, label: 'Vault' },
            { id: 'RADAR', icon: Search, label: 'Radar' },
            { id: 'NODE', icon: User, label: 'Studio' }
          ].map((nav) => (
            <button 
              key={nav.id}
              onClick={() => { setView(nav.id as any); setSearch(''); }}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-full transition-all ${view === nav.id ? 'bg-white text-black scale-105 shadow-xl' : 'text-white/40 hover:text-white'}`}
            >
              <nav.icon size={nav.id === 'RADAR' ? 24 : 20} strokeWidth={view === nav.id ? 2.5 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PLAYER HUD */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -85, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[100] px-4 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto premium-glass p-3 rounded-2xl border border-primary/40 pointer-events-auto flex items-center gap-4 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary overflow-hidden relative">
                <MusicIcon size={20} />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 1 }} className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-[10px] md:text-xs font-black truncate tracking-tighter">{activeTrack.title}</h4>
                <div className="flex items-center gap-2 text-[7px] font-black opacity-50 uppercase tracking-widest">
                  <span className="text-primary">{activeTrack.isrc}</span>
                  <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  <span>Streaming via P2P</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 text-white hover:text-primary">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <button onClick={handleTrackEnd} className="p-2 text-white/40 hover:text-white">
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        onEnded={handleTrackEnd}
        className="hidden" 
      />

    </main>
  );
}
