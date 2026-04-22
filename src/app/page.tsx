"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Activity, Music as MusicIcon, Zap, Globe, Library, PlusCircle,
  Share2, Heart, User, Cpu, CloudUpload, Play, Pause, SkipForward,
  Trash2, Loader2, Plus, Check, FileText, Mic2
} from 'lucide-react';
import { WAVE_QUERY_DATA, SearchResult } from '@/data/omni-search';

export default function AlphaWaverseEngine() {
  // Localization Engine
  const [lang, setLang] = useState<'EN' | 'KR'>('EN');
  
  const T = {
    EN: {
      wealth: "Sovereign Wealth",
      power: "Network Power",
      status: "Tunecore Hub Active",
      title: "ALPHA WAVERSE",
      placeholder: "Explore AI, Human & Hybrid Waves...",
      radar: "Radar",
      vault: "Vault",
      studio: "Studio",
      discoveries: "Universal Discoveries",
      reset: "Reset",
      playAllVault: "Play All Vault",
      playAllStudio: "Play My Studio",
      vaultEmpty: "Vault is Empty",
      nodeCertified: "Hybrid Node Certified",
      validating: "Validating Master Asset...",
      streaming: "P2P Multi-Format Streaming",
      uploadAsset: "Register WAV / MP4 Asset",
      uploading: "Encoding to Global Node...",
      uploadSuccess: "Asset Registered!",
      formatHint: "Supports WAV, MP3, MP4 (Video)",
      score: "View Score",
      mr: "MR Mode"
    },
    KR: {
      wealth: "주권적 자산",
      power: "네트워크 파워",
      status: "툰코어 글로벌 활성",
      title: "ALPHA WAVERSE",
      placeholder: "AI, 휴먼, 하이브리드 파동 탐험...",
      radar: "레이더",
      vault: "보관함",
      studio: "스튜디오",
      discoveries: "통합 검색 결과",
      reset: "초기화",
      playAllVault: "보관함 전체 재생",
      playAllStudio: "내 스튜디오 재생",
      vaultEmpty: "보관함이 비어있습니다",
      nodeCertified: "하이브리드 노드 인증됨",
      validating: "마스터 자산 검증 중...",
      streaming: "P2P 통합 포맷 스트리밍",
      uploadAsset: "WAV / MP4 자산 등록",
      uploading: "글로벌 노드 인코딩 중...",
      uploadSuccess: "자산 등록 완료!",
      formatHint: "WAV, MP3, MP4(영상) 포맷 지원",
      score: "악보 보기",
      mr: "MR 모드"
    }
  }[lang];

  useEffect(() => {
    const userLang = navigator.language.startsWith('ko') ? 'KR' : 'EN';
    setLang(userLang);
  }, []);

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
  const [isUploading, setIsUploading] = useState(false);

  // Data Persistence: Load from LocalStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('alpha_waverse_likes');
    if (savedLikes) setLikedTracks(JSON.parse(savedLikes));
    
    const savedOwned = localStorage.getItem('alpha_waverse_owned');
    if (savedOwned) setOwnedAssets(JSON.parse(savedOwned));
  }, []);

  // Data Persistence: Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('alpha_waverse_likes', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    localStorage.setItem('alpha_waverse_owned', JSON.stringify(ownedAssets));
  }, [ownedAssets]);

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

  // Audio Playback Sync Controller
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Audio Source Controller
  useEffect(() => {
    if (activeTrack && audioRef.current) {
      audioRef.current.src = activeTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Source play error:", err));
      }
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
      setIsPlaying(true);
    }
  };

  // Mock Upload Function
  const handleUpload = () => {
    const title = window.prompt(lang === 'KR' ? "등록할 음원의 이름을 입력하세요:" : "Enter the title of the asset to register:");
    if (!title) return;

    setIsUploading(true);
    
    setTimeout(() => {
      const newId = `user-asset-${Date.now()}`;
      setOwnedAssets(prev => [newId, ...prev]);
      
      const updatedTitles = { ...customTitles, [newId]: title };
      setCustomTitles(updatedTitles);
      localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(updatedTitles));
      
      setIsUploading(false);
      alert(lang === 'KR' ? "자산 등록이 완료되었습니다. 글로벌 ISRC 발급 대행이 시작되었습니다!" : "Asset registered! Global ISRC proxy registration initiated.");
    }, 3000);
  };

  const filteredResults = useMemo(() => {
    if (!search) return [];
    const lowerSearch = search.toLowerCase();
    return WAVE_QUERY_DATA.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerSearch);
      const categoryMatch = item.category.toLowerCase().includes(lowerSearch);
      // Logic for Korean keyword matching (e.g. searching '명상' for 'Meditation')
      const koreanMatch = (
        (lowerSearch.includes('명상') && item.title.toLowerCase().includes('meditation')) ||
        (lowerSearch.includes('딥') && item.title.toLowerCase().includes('deep')) ||
        (lowerSearch.includes('흐름') && item.title.toLowerCase().includes('flow')) ||
        (lowerSearch.includes('알파') && item.title.toLowerCase().includes('alpha'))
      );
      return titleMatch || categoryMatch || koreanMatch;
    }).slice(0, 8);
  }, [search]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const removeFromVault = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => prev.filter(t => t !== id));
  };

  // Load custom titles for uploaded assets
  const [customTitles, setCustomTitles] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const saved = localStorage.getItem('alpha_waverse_custom_titles');
    if (saved) setCustomTitles(JSON.parse(saved));
  }, []);

  const ownedDisplayList = useMemo(() => {
    return ownedAssets.map(id => {
      const original = WAVE_QUERY_DATA.find(t => t.id === id);
      if (original) return original;
      return {
        id,
        title: customTitles[id] || "New Sonic Asset",
        type: 'Music' as const,
        category: 'User Asset',
        isrc: `ISRC-USR-${id.slice(-4)}`,
        status: 'Certified',
        url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-1.mp3' // Default mock audio
      };
    });
  }, [ownedAssets, customTitles]);

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
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-primary/60">{T.wealth}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm md:text-lg font-black tabular-nums">{minedShares.toFixed(4)}</span>
              <span className="text-[8px] font-bold text-primary">α</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[6px] font-black uppercase tracking-[0.3em]">{T.status}</span>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-secondary/60">{T.power}</span>
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
              {!search && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full flex flex-col gap-8"
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-8 md:gap-12 w-full px-4"
                  >
                    <h1 className="text-4xl md:text-7xl font-black tracking-[0.3em] uppercase bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none text-center pl-[0.3em]">
                      {T.title}
                    </h1>
                    <div className="relative w-full max-w-2xl group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                      <div className="relative flex items-center bg-white/[0.03] border-b border-white/10 focus-within:border-primary transition-all">
                        <Search className="absolute left-4 text-white/20 group-focus-within:text-primary w-5 h-5 md:w-6 md:h-6" />
                        <input 
                          type="text" 
                          autoFocus
                          placeholder={T.placeholder} 
                          className="w-full bg-transparent py-6 md:py-8 px-12 md:px-14 text-lg md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* PERSONALIZED RECOMMENDATIONS */}
                  <div className="w-full space-y-4 px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-primary rounded-full" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">FOR YOU: DAILY WAVE</h2>
                      </div>
                      <span className="text-[8px] font-black uppercase text-primary animate-pulse">Personalized Live</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar scroll-smooth">
                      {WAVE_QUERY_DATA.slice(0, 5).map((item) => (
                        <div 
                          key={`rec-${item.id}`}
                          onClick={() => { setActiveTrack(item); setPlaylist(WAVE_QUERY_DATA.slice(0, 5)); setIsPlaying(true); }}
                          className="min-w-[200px] md:min-w-[280px] premium-glass p-5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-3">
                            <Activity size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all">
                            <MusicIcon size={20} />
                          </div>
                          <h3 className="font-bold text-lg md:text-xl tracking-tight mb-1 truncate">{item.title}</h3>
                          <div className="flex items-center gap-2 text-[8px] font-black uppercase opacity-30">
                            <span className="text-primary">{item.category}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-white" />
                            <span>{item.isrc}</span>
                          </div>
                        </div>
                      ))}
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
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{T.discoveries}</h2>
                    <button onClick={() => setSearch('')} className="text-[8px] font-black uppercase text-white/40 hover:text-white">{T.reset}</button>
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
                <div className="relative">
                  <Heart size={32} className="text-red-500" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -inset-2 bg-red-500/10 blur-xl rounded-full" />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase">{T.vault}</h2>
                <button 
                  onClick={() => playAll(WAVE_QUERY_DATA.filter(item => likedTracks.includes(item.id)))}
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(239,68,68,0.3)]"
                >
                  <Play size={12} fill="currentColor" /> {T.playAllVault}
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-48">
                {WAVE_QUERY_DATA.filter(item => likedTracks.includes(item.id)).map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => { setActiveTrack(item); setPlaylist(WAVE_QUERY_DATA.filter(t => likedTracks.includes(t.id))); setIsPlaying(true); }} 
                    className={`premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer transition-all ${activeTrack?.id === item.id ? 'bg-red-500/10 border-red-500/30' : 'hover:bg-red-500/5 group'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeTrack?.id === item.id ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 group-hover:scale-105'}`}>
                        {activeTrack?.id === item.id && isPlaying ? <Activity size={20} className="animate-pulse" /> : <Play size={18} fill="currentColor" />}
                      </div>
                      <div>
                        <p className="font-bold text-base md:text-lg tracking-tight">{item.title}</p>
                        <p className="text-[8px] font-black opacity-30 uppercase tracking-widest">{item.isrc}</p>
                      </div>
                    </div>
                    <button onClick={(e) => removeFromVault(item.id, e)} className="text-white/20 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {likedTracks.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4">
                    <Heart size={40} strokeWidth={1} />
                    <p className="text-xs font-black uppercase tracking-widest">{T.vaultEmpty}</p>
                  </div>
                )}
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
                <div className="relative">
                  <Cpu size={32} className="text-primary" />
                  <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full" />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase">{T.studio}</h2>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => playAll(ownedDisplayList as any)}
                      className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)]"
                    >
                      <Play size={12} fill="currentColor" /> {T.playAllStudio}
                    </button>
                    <button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                      {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                      {isUploading ? T.uploading : T.uploadAsset}
                    </button>
                  </div>
                  <p className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30">{T.formatHint}</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 pb-48">
                {isUploading && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="premium-glass p-6 rounded-3xl border border-primary/30 bg-primary/5 flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                        <Loader2 size={24} className="animate-spin" />
                      </div>
                      <div>
                        <p className="text-base md:text-xl font-black tracking-tight opacity-50">Encoding Asset...</p>
                        <p className="text-[10px] font-black uppercase text-primary">{T.uploading}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {ownedDisplayList.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => { setActiveTrack(item as any); setPlaylist(ownedDisplayList as any); setIsPlaying(true); }} 
                    className={`premium-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between transition-all cursor-pointer ${activeTrack?.id === item.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-primary/5 group'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${activeTrack?.id === item.id ? 'bg-primary text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]' : 'bg-primary/10 text-primary group-hover:scale-105'}`}>
                        {activeTrack?.id === item.id && isPlaying ? <Activity size={24} className="animate-pulse" /> : <CloudUpload size={24} />}
                      </div>
                      <div>
                        <p className="text-base md:text-xl font-black tracking-tight">{item.title}</p>
                        <div className="flex items-center gap-2 opacity-30 text-[10px] font-black uppercase tracking-widest">
                          <span>{'status' in item ? item.status : 'Certified'}</span>
                          <span className="w-1 h-1 rounded-full bg-white" />
                          <span className="text-primary">{T.nodeCertified}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-1">
                        <div className="text-[7px] font-black px-2 py-0.5 bg-primary text-black rounded-full animate-pulse">ISRC PROXY</div>
                        <div className="text-[6px] font-black opacity-30 uppercase tracking-tighter">Global Registry Pending</div>
                      </div>
                      <Share2 size={20} className="text-white/20 hover:text-primary transition-colors" />
                    </div>
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
            { id: 'LIKES', icon: Heart, label: T.vault },
            { id: 'RADAR', icon: Search, label: T.radar },
            { id: 'NODE', icon: User, label: T.studio }
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
                  <span>{T.streaming}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => alert(lang === 'KR' ? 'AI 악보 생성 및 채보 엔진이 가동 중입니다...' : 'AI Score Generation & Transcription Engine in progress...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group border border-white/5 hover:border-primary/30"
                >
                  <FileText size={12} className="group-hover:text-primary transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-wider">{T.score}</span>
                </button>
                <button 
                  onClick={() => alert(lang === 'KR' ? 'AI 보컬 제거 및 MR 추출 엔진이 가동 중입니다...' : 'AI Vocal Removal & MR Extraction Engine in progress...')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group border border-white/5 hover:border-secondary/30"
                >
                  <Mic2 size={12} className="group-hover:text-secondary transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-wider">{T.mr}</span>
                </button>
                <div className="flex items-center gap-2 border-l border-white/10 pl-3 ml-1">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                  <button onClick={handleTrackEnd} className="p-2 text-white/40 hover:text-white transition-colors">
                    <SkipForward size={20} />
                  </button>
                </div>
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
