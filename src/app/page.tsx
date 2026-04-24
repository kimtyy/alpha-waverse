"use client";

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Activity, Music as MusicIcon, Zap, Globe, Library, PlusCircle,
  Share2, Heart, User, Cpu, CloudUpload, Play, Pause, SkipForward,
  Trash2, Loader2, Plus, Check, FileText, Mic2, TrendingUp, ShieldCheck, Coins, ChevronRight,
  Video, RefreshCw, Layers
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
      mr: "MR Mode",
      visionTitle: "Economic Vision",
      visionSubtitle: "Sovereign Asset & Triple Income Model",
      bmStream1: "Ad Revenue Share",
      bmStream2: "Asset Direct Sales",
      bmStream3: "P2P Node Mining"
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
      mr: "MR 모드",
      visionTitle: "경제 비전 리포트",
      visionSubtitle: "주권적 자산 및 3대 수익 모델",
      bmStream1: "광고 수익 공유",
      bmStream2: "에셋 직거래 수익",
      bmStream3: "P2P 노드 채굴 보상"
    }
  }[lang];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLang = navigator.language.startsWith('ko') ? 'KR' : 'EN';
      setLang(userLang);
    }
  }, []);

  // Navigation & Search State
  const [view, setView] = useState<'RADAR' | 'LIKES' | 'NODE'>('RADAR');
  const [search, setSearch] = useState('');
  
  // Playback State
  const [activeTrack, setActiveTrack] = useState<SearchResult | null>(null);
  const [playlist, setPlaylist] = useState<SearchResult[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // User Assets State
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  const [ownedAssets, setOwnedAssets] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showVision, setShowVision] = useState(false);
  
  // Sovereign Auth State
  const [user, setUser] = useState<{ email: string; name: string; avatar?: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  // Asset Editing State
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editArtist, setEditArtist] = useState('');
  const [editProducer, setEditProducer] = useState('');

  // Default Settings for Fast Registration
  const [defaultProducer, setDefaultProducer] = useState('Alpha Owner');

  // Batch Editing State
  const [showBatchEditModal, setShowBatchEditModal] = useState(false);
  const [batchArtist, setBatchArtist] = useState('');
  const [batchProducer, setBatchProducer] = useState('');

  const handleLogout = () => {
    setUser(null);
    setIsCloudSynced(false);
    alert(lang === 'KR' ? "안전하게 로그아웃되었습니다. 로컬 모드로 전환합니다." : "Logged out safely. Switching to local mode.");
  };

  const handleAuth = (type: 'GOOGLE' | 'EMAIL') => {
    setIsAuthLoading(true);
    // Simulate Global Node Handshake
    setTimeout(() => {
      const mockUser = {
        email: type === 'GOOGLE' ? 'bujang@google.com' : authEmail || 'user@waverse.io',
        name: type === 'GOOGLE' ? 'Kidari Bujang' : 'Alpha Node Owner',
        avatar: type === 'GOOGLE' ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bujang' : undefined
      };
      setUser(mockUser);
      setIsCloudSynced(true);
      setIsAuthLoading(false);
      setShowAuthModal(false);
      setAuthEmail('');
      alert(lang === 'KR' ? `환영합니다, ${mockUser.name}님! 클라우드 자산 동기화가 활성화되었습니다.` : `Welcome, ${mockUser.name}! Cloud sync activated.`);
    }, 2000);
  };

  const handleOpenEdit = (item: SearchResult) => {
    setEditingAssetId(item.id);
    const titleParts = item.title.split('/');
    setEditTitle(titleParts[0].trim());
    setEditArtist(titleParts.length > 1 ? titleParts.slice(1).join(' / ').trim() : '');
    setEditProducer(customProducers[item.id] || '');
  };

  const handleSaveEdit = () => {
    if (!editingAssetId) return;
    
    const finalTitle = editArtist ? `${editTitle} / ${editArtist}` : editTitle;
    setCustomTitles(prev => ({ ...prev, [editingAssetId]: finalTitle }));
    setCustomProducers(prev => ({ ...prev, [editingAssetId]: editProducer }));
    
    setEditingAssetId(null);
    alert(lang === 'KR' ? "자산 메타데이터가 수정되었습니다." : "Asset metadata updated.");
  };

  const handleBatchSave = () => {
    if (selectedTrackIds.length === 0) return;
    
    selectedTrackIds.forEach(id => {
      // For each track, update Artist and Producer if provided
      if (batchArtist) {
        const currentTitle = customTitles[id] || WAVE_QUERY_DATA.find(t => t.id === id)?.title || "Unknown";
        const baseTitle = currentTitle.split('/')[0].trim();
        setCustomTitles(prev => ({ ...prev, [id]: `${baseTitle} / ${batchArtist}` }));
      }
      if (batchProducer) {
        setCustomProducers(prev => ({ ...prev, [id]: batchProducer }));
      }
    });
    
    setShowBatchEditModal(false);
    setBatchArtist('');
    setBatchProducer('');
    alert(lang === 'KR' ? `${selectedTrackIds.length}개의 자산이 일괄 수정되었습니다.` : `${selectedTrackIds.length} assets batch updated.`);
  };
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiTaskType, setAiTaskType] = useState<'SCORE' | 'MR' | null>(null);

  // Asset URL & Generated Sub-Assets Management
  const [customUrls, setCustomUrls] = useState<Record<string, string>>({});
  const [generatedAssets, setGeneratedAssets] = useState<Record<string, { scores: string[], mrs: string[] }>>({});
  const [showScoreViewer, setShowScoreViewer] = useState<string | null>(null); // Track ID
  const [showVideoPlayer, setShowVideoPlayer] = useState<string | null>(null); // Track ID

  // Global Sync & Legacy Integration
  const [isSyncing, setIsSyncing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importIsrc, setImportIsrc] = useState('');
  const [legacyAssetIds, setLegacyAssetIds] = useState<string[]>([]);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
  
  // Local Filtering States
  const [studioSearch, setStudioSearch] = useState('');
  const [vaultSearch, setVaultSearch] = useState('');
  const [showUnifiedLibrary, setShowUnifiedLibrary] = useState(false);

  // DistroKid-style Registration Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadArtist, setUploadArtist] = useState('');
  const [uploadProducer, setUploadProducer] = useState('');
  const [customProducers, setCustomProducers] = useState<Record<string, string>>({});
  const [registeredFilenames, setRegisteredFilenames] = useState<Set<string>>(new Set());

  const singleInputRef = useRef<HTMLInputElement>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);

  // IndexedDB for Persistent Audio Storage
  const saveToIndexedDB = async (id: string, file: File) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AlphaWaverseDB', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('assets');
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('assets', 'readwrite');
        tx.objectStore('assets').put(file, id);
        tx.oncomplete = () => resolve(true);
      };
      request.onerror = () => reject(request.error);
    });
  };

  const loadFromIndexedDB = async (id: string) => {
    return new Promise<string | null>((resolve) => {
      const request = indexedDB.open('AlphaWaverseDB', 1);
      request.onsuccess = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('assets')) { resolve(null); return; }
        const tx = db.transaction('assets', 'readonly');
        const getReq = tx.objectStore('assets').get(id);
        getReq.onsuccess = () => {
          if (getReq.result) {
            resolve(URL.createObjectURL(getReq.result));
          } else {
            resolve(null);
          }
        };
      };
      request.onerror = () => resolve(null);
    });
  };

  // Search Debouncing Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 300); // 300ms delay to give the user "thinking time"

    return () => clearTimeout(handler);
  }, [search]);

  // Data Persistence: Load from LocalStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('alpha_waverse_likes');
    if (savedLikes) setLikedTracks(JSON.parse(savedLikes));
    
    const savedOwned = localStorage.getItem('alpha_waverse_owned');
    if (savedOwned) setOwnedAssets(JSON.parse(savedOwned));

    const savedGenerated = localStorage.getItem('alpha_waverse_generated');
    if (savedGenerated) setGeneratedAssets(JSON.parse(savedGenerated));

    const savedSigs = localStorage.getItem('alpha_waverse_registered_sigs');
    if (savedSigs) setRegisteredFilenames(new Set(JSON.parse(savedSigs)));

    const savedProducers = localStorage.getItem('alpha_waverse_custom_producers');
    if (savedProducers) setCustomProducers(JSON.parse(savedProducers));
  }, []);

  // Data Persistence: Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('alpha_waverse_likes', JSON.stringify(likedTracks));
  }, [likedTracks]);

  useEffect(() => {
    localStorage.setItem('alpha_waverse_owned', JSON.stringify(ownedAssets));
  }, [ownedAssets]);

  useEffect(() => {
    localStorage.setItem('alpha_waverse_generated', JSON.stringify(generatedAssets));
  }, [generatedAssets]);

  useEffect(() => {
    localStorage.setItem('alpha_waverse_registered_sigs', JSON.stringify(Array.from(registeredFilenames)));
  }, [registeredFilenames]);

  useEffect(() => {
    localStorage.setItem('alpha_waverse_legacy_ids', JSON.stringify(legacyAssetIds));
  }, [legacyAssetIds]);

  useEffect(() => {
    const savedLegacy = localStorage.getItem('alpha_waverse_legacy_ids');
    if (savedLegacy) setLegacyAssetIds(JSON.parse(savedLegacy));

    const savedProducer = localStorage.getItem('alpha_waverse_default_producer');
    if (savedProducer) setDefaultProducer(savedProducer);

    // Load custom URLs from IndexedDB
    const loadAllCustomUrls = async () => {
      const savedOwned = localStorage.getItem('alpha_waverse_owned');
      if (savedOwned) {
        const ids = JSON.parse(savedOwned) as string[];
        const urlMap: Record<string, string> = {};
        for (const id of ids) {
          if (id.startsWith('user-asset-')) {
            const url = await loadFromIndexedDB(id);
            if (url) urlMap[id] = url;
          }
        }
        setCustomUrls(prev => ({ ...prev, ...urlMap }));
      }
    };
    loadAllCustomUrls();
  }, []);

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

  // Audio Source & Playback Controller (Unified)
  useEffect(() => {
    if (!activeTrack || !audioRef.current) return;

    // Handle Video switching
    if (activeTrack.type === 'Video') {
      setIsPlaying(false); // Pause background audio
      setShowVideoPlayer(activeTrack.id);
      return;
    }

    const playAudio = async () => {
      try {
        // Resolve the most current URL (prioritize customUrls for user assets)
        const currentUrl = customUrls[activeTrack.id] || activeTrack.url;
        
        if (audioRef.current!.src !== currentUrl) {
          audioRef.current!.src = currentUrl;
          audioRef.current!.load();
        }

        if (isPlaying) {
          await audioRef.current!.play();
        } else {
          audioRef.current!.pause();
        }
      } catch (err) {
        console.error("Playback System Error:", err);
        // If it's a user asset and playback failed, try to restore from IndexedDB
        if (activeTrack.id.startsWith('user-asset-')) {
          const restoredUrl = await loadFromIndexedDB(activeTrack.id);
          if (restoredUrl && audioRef.current) {
            setCustomUrls(prev => ({ ...prev, [activeTrack.id]: restoredUrl }));
            audioRef.current.src = restoredUrl;
            if (isPlaying) audioRef.current.play().catch(e => console.log("Final recovery failed", e));
          }
        }
      }
    };

    playAudio();
  }, [activeTrack, isPlaying, customUrls]);

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

  // Smart Filename Parser
  const parseFilename = (filename: string) => {
    // Remove extension
    const name = filename.replace(/\.[^/.]+$/, "");
    
    // Pattern 1: Artist - Title or Artist ~ Title
    const separators = [' - ', ' ~ ', ' _ ', '-', '~', '_'];
    for (const sep of separators) {
      if (name.includes(sep)) {
        const parts = name.split(sep);
        if (parts.length >= 2) {
          return {
            artist: parts[0].trim(),
            title: parts.slice(1).join(sep).trim()
          };
        }
      }
    }

    // Pattern 2: Title (Artist) or Title [Artist]
    const bracketMatches = name.match(/(.+?)\s*[\(\[](.+?)[\)\]]/);
    if (bracketMatches) {
      return {
        title: bracketMatches[1].trim(),
        artist: bracketMatches[2].trim()
      };
    }

    // Default: Entire name as title
    return {
      title: name,
      artist: "Unknown"
    };
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter out duplicates using filename + size as a simple signature
    const newFiles = files.filter(f => !registeredFilenames.has(`${f.name}-${f.size}`));
    const duplicatesCount = files.length - newFiles.length;

    if (duplicatesCount > 0) {
      alert(lang === 'KR' 
        ? `${duplicatesCount}개의 파일은 이미 등록되어 있어 제외되었습니다.` 
        : `${duplicatesCount} duplicate files were skipped.`);
    }

    if (newFiles.length === 0) {
      e.target.value = '';
      return;
    }

    // NEW: Immediate Batch Registration Flow (Fast Sovereignty)
    setIsUploading(true);
    
    // Process all files in background
    setTimeout(async () => {
      const newAssets = [];
      const newSigs = new Set(registeredFilenames);
      const updatedTitles = { ...customTitles };
      const updatedProducers = { ...customProducers };

      for (const file of newFiles) {
        const newId = `user-asset-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const isVideo = file.type.startsWith('video/');
        
        // Smart Parsing
        const { title, artist } = parseFilename(file.name);
        const fullTitle = `${title} / ${artist} / ${defaultProducer}`;
        
        try {
          await saveToIndexedDB(newId, file);
          const localUrl = URL.createObjectURL(file);
          setCustomUrls(prev => ({ ...prev, [newId]: localUrl }));
          newAssets.push(newId);
          newSigs.add(`${file.name}-${file.size}`);
          
          updatedTitles[newId] = fullTitle;
          updatedProducers[newId] = defaultProducer;
        } catch (err) {
          console.error("Fast Registration Failed", err);
        }
      }
      
      setCustomTitles(updatedTitles);
      setCustomProducers(updatedProducers);
      localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(updatedTitles));
      localStorage.setItem('alpha_waverse_custom_producers', JSON.stringify(updatedProducers));
      
      setRegisteredFilenames(newSigs);
      setOwnedAssets(prev => [...newAssets, ...prev]);
      setIsUploading(false);
      
      alert(lang === 'KR' 
        ? `${newAssets.length}개의 자산이 등록되었습니다. 이제 목록에서 정보를 수정하실 수 있습니다.` 
        : `${newAssets.length} assets registered! You can now edit metadata in the list.`);
    }, 1000);
    
    e.target.value = '';
  };

  const toggleSelection = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedTrackIds(prev => 
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    );
  };

  const playSelected = (pool: any[]) => {
    const tracksToPlay = pool.filter(t => selectedTrackIds.includes(t.id));
    if (tracksToPlay.length > 0) {
      setActiveTrack(tracksToPlay[0]);
      setPlaylist(tracksToPlay);
      setIsPlaying(true);
      setSelectedTrackIds([]);
    }
  };

  const deleteSelected = () => {
    if (selectedTrackIds.length === 0) return;
    if (window.confirm(lang === 'KR' ? `${selectedTrackIds.length}개의 자산을 삭제하시겠습니까?` : `Delete ${selectedTrackIds.length} assets?` )) {
      setOwnedAssets(prev => prev.filter(id => !selectedTrackIds.includes(id)));
      setSelectedTrackIds([]);
    }
  };

  const handleImportLegacy = () => {
    if (!importIsrc) return;
    setIsSyncing(true);
    setShowImportModal(false);
    
    setTimeout(() => {
      const found = WAVE_QUERY_DATA.find(t => t.isrc.includes(importIsrc));
      if (found) {
        if (!ownedAssets.includes(found.id)) {
          setOwnedAssets(prev => [found.id, ...prev]);
          setLegacyAssetIds(prev => [...prev, found.id]);
          alert(lang === 'KR' ? "레거시 자산이 스튜디오에 연결되었습니다!" : "Legacy asset linked to Studio!");
        } else {
          alert(lang === 'KR' ? "이미 등록된 자산입니다." : "Already registered.");
        }
      } else {
        alert(lang === 'KR' ? "해당 ISRC를 찾을 수 없습니다." : "ISRC not found.");
      }
      setIsSyncing(false);
      setImportIsrc('');
    }, 2000);
  };

  const handleBatchUpload = async () => {
    if (batchFiles.length === 0) return;
    
    setIsUploading(true);
    setShowBatchModal(false);
    
    setTimeout(async () => {
      const newAssets = [];
      const newSigs = new Set(registeredFilenames);
      const updatedTitles = { ...customTitles };
      const updatedProducers = { ...customProducers };

      for (const file of batchFiles) {
        const newId = `batch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        // Format: Title / Artist / Producer
        const baseTitle = file.name.split('.')[0];
        const fullTitle = `${baseTitle} / ${uploadArtist || "Unknown"} / ${uploadProducer || "Unknown"}`;
        
        try {
          await saveToIndexedDB(newId, file);
          const localUrl = URL.createObjectURL(file);
          setCustomUrls(prev => ({ ...prev, [newId]: localUrl }));
          newAssets.push(newId);
          newSigs.add(`${file.name}-${file.size}`);
          
          updatedTitles[newId] = fullTitle;
          if (uploadProducer) {
            updatedProducers[newId] = uploadProducer;
          }
        } catch (err) {
          console.error("Batch Save Failed", err);
        }
      }
      
      setCustomTitles(updatedTitles);
      setCustomProducers(updatedProducers);
      localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(updatedTitles));
      localStorage.setItem('alpha_waverse_custom_producers', JSON.stringify(updatedProducers));
      
      setRegisteredFilenames(newSigs);
      setOwnedAssets(prev => [...newAssets, ...prev]);
      setIsUploading(false);
      setBatchFiles([]);
      setUploadArtist('');
      setUploadProducer('');
      alert(lang === 'KR' ? `${newAssets.length}개의 자산이 한 번에 주권 등록되었습니다!` : `${newAssets.length} assets registered with full sovereignty!`);
    }, 2000);
  };

  const handleFinalUpload = async () => {
    if (!uploadFile || !uploadTitle) return;

    setIsUploading(true);
    setShowUploadModal(false);
    
    setTimeout(async () => {
      const newId = `user-asset-${Date.now()}`;
      const isVideo = uploadFile.type.startsWith('video/');
      const fullTitle = `${uploadTitle} / ${uploadArtist || 'Unknown'} / ${uploadProducer || 'Unknown'}`;
      
      try {
        await saveToIndexedDB(newId, uploadFile);
        const localUrl = URL.createObjectURL(uploadFile);
        setCustomUrls(prev => ({ ...prev, [newId]: localUrl }));
        
        setOwnedAssets(prev => [newId, ...prev]);
        setRegisteredFilenames(prev => new Set(prev).add(`${uploadFile.name}-${uploadFile.size}`));
        const updatedTitles = { ...customTitles, [newId]: fullTitle };
        setCustomTitles(updatedTitles);
        localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(updatedTitles));
        
        if (uploadProducer) {
          const updatedProducers = { ...customProducers, [newId]: uploadProducer };
          setCustomProducers(updatedProducers);
          localStorage.setItem('alpha_waverse_custom_producers', JSON.stringify(updatedProducers));
        }
        
        setIsUploading(false);

        const newAsset = {
          id: newId,
          title: fullTitle,
          type: (isVideo ? 'Video' : 'Music') as any,
          category: isVideo ? (lang === 'KR' ? '마스터 영상 (YouTube)' : 'Master Video (YouTube)') : (lang === 'KR' ? '사용자 자산' : 'User Asset'),
          isrc: `ISRC-USR-${newId.slice(-4)}`,
          status: 'Certified',
          url: localUrl
        };
        
        setActiveTrack(newAsset as any);
        if (isVideo) {
          setShowVideoPlayer(newId);
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      } catch (err) {
        console.error("Upload/Save Failed", err);
        alert(lang === 'KR' ? "파일 저장 중 오류가 발생했습니다." : "Error occurred while saving file.");
        setIsUploading(false);
      }
    }, 1500);
  };
  const playAll = (tracks: SearchResult[]) => {
    if (tracks.length > 0) {
      setPlaylist(tracks);
      setActiveTrack(tracks[0]);
      setIsPlaying(true);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAITask = (type: 'SCORE' | 'MR') => {
    if (!activeTrack) return;
    
    setAiTaskType(type);
    setIsProcessingAI(true);
    
    setTimeout(() => {
      setIsProcessingAI(false);
      
      const trackId = activeTrack.id;
      setGeneratedAssets(prev => {
        const current = prev[trackId] || { scores: [], mrs: [] };
        if (type === 'SCORE') {
          return { ...prev, [trackId]: { ...current, scores: [...current.scores, `Score-${Date.now()}`] } };
        } else {
          return { ...prev, [trackId]: { ...current, mrs: [...current.mrs, `MR-${Date.now()}`] } };
        }
      });

      if (type === 'SCORE') {
        setShowScoreViewer(trackId);
      } else {
        const mrTitle = `[MR/Inst] ${customTitles[trackId] || activeTrack.title}`;
        const mrId = `mr-${trackId}-${Date.now()}`;
        setOwnedAssets(prev => [mrId, ...prev]);
        setCustomTitles(prev => {
          const updated = { ...prev, [mrId]: mrTitle };
          localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(updated));
          return updated;
        });
        setCustomProducers(prev => {
          const updated = { ...prev, [mrId]: "AI Hybrid Engine" };
          localStorage.setItem('alpha_waverse_custom_producers', JSON.stringify(updated));
          return updated;
        });
        alert(lang === 'KR' ? "MR이 생성되어 스튜디오에 등록되었습니다! 목록 상단에서 확인하세요." : "MR generated and registered to Studio! Check the top of the list.");
      }
      
      setAiTaskType(null);
    }, 3500);
  };


  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const removeFromVault = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTracks(prev => prev.filter(t => t !== id));
  };

  const deleteAsset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(lang === 'KR' ? "이 자산을 삭제하시겠습니까?" : "Delete this asset?")) {
      setOwnedAssets(prev => prev.filter(t => t !== id));
      // Cleanup custom titles and URLs
      const newTitles = { ...customTitles };
      delete newTitles[id];
      setCustomTitles(newTitles);
      localStorage.setItem('alpha_waverse_custom_titles', JSON.stringify(newTitles));
      
      const newUrls = { ...customUrls };
      delete newUrls[id];
      setCustomUrls(newUrls);
      
      // Optionally delete from IndexedDB (omitted for brevity but recommended)
    }
  };

  const clearStudio = () => {
    if (window.confirm(lang === 'KR' ? "모든 자산을 삭제하고 스튜디오를 초기화하시겠습니까? (되돌릴 수 없습니다)" : "Are you sure you want to clear all assets and reset the Studio? (This cannot be undone)")) {
      setOwnedAssets([]);
      setCustomTitles({});
      setCustomUrls({});
      setCustomProducers({});
      localStorage.removeItem('alpha_waverse_owned');
      localStorage.removeItem('alpha_waverse_custom_titles');
      localStorage.removeItem('alpha_waverse_custom_producers');
    }
  };

  // Load custom titles for uploaded assets
  const [customTitles, setCustomTitles] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const saved = localStorage.getItem('alpha_waverse_custom_titles');
    if (saved) setCustomTitles(JSON.parse(saved));
    const savedProducers = localStorage.getItem('alpha_waverse_custom_producers');
    if (savedProducers) setCustomProducers(JSON.parse(savedProducers));
  }, []);

  const ownedDisplayList = useMemo(() => {
    // Determine the base pool: strictly owned or unified (owned + liked)
    const baseIds = showUnifiedLibrary ? Array.from(new Set([...ownedAssets, ...likedTracks])) : ownedAssets;

    return baseIds.map(id => {
      const original = WAVE_QUERY_DATA.find(t => t.id === id);
      if (original) return original;
      
      const isVideoId = id.includes('video') || (customTitles[id] && customTitles[id].toLowerCase().includes('video')); // Fallback detection
      
      return {
        id,
        title: customTitles[id] || (lang === 'KR' ? "신규 등록 자산" : "New Registered Asset"),
        type: (isVideoId ? 'Video' : 'Music') as any,
        category: isVideoId 
          ? (lang === 'KR' ? '마스터 영상 (YouTube)' : 'Master Video (YouTube)') 
          : id.startsWith('mr-') 
            ? (lang === 'KR' ? 'AI 하이브리드 MR' : 'AI Hybrid Engine')
            : id.startsWith('legacy-asset-')
              ? (lang === 'KR' ? '레거시 IP 통합 자산' : 'Legacy IP Integrated Asset')
              : customProducers[id] 
                ? (lang === 'KR' ? `${customProducers[id]}의 자산` : `Asset of ${customProducers[id]}`)
                : (lang === 'KR' ? '등록자의 자산' : "Registrant's Asset"),
        isrc: id.startsWith('legacy-asset-') ? id.split('-')[2] : `KR-AWV-26-${id.slice(-5).toUpperCase()}`,
        status: 'Certified',
        url: customUrls[id] || '' 
      };
    });
  }, [ownedAssets, likedTracks, showUnifiedLibrary, customTitles, customUrls, customProducers, lang]);

  const filteredOwnedList = useMemo(() => {
    if (!studioSearch) return ownedDisplayList;
    const term = studioSearch.toLowerCase();
    return ownedDisplayList.filter(t => 
      t.title.toLowerCase().includes(term) || 
      t.category.toLowerCase().includes(term) ||
      t.isrc.toLowerCase().includes(term)
    );
  }, [ownedDisplayList, studioSearch]);

  const filteredVaultList = useMemo(() => {
    const vaultPool = WAVE_QUERY_DATA.filter(item => likedTracks.includes(item.id));
    if (!vaultSearch) return vaultPool;
    const term = vaultSearch.toLowerCase();
    return vaultPool.filter(t => 
      t.title.toLowerCase().includes(term) || 
      t.category.toLowerCase().includes(term) ||
      t.isrc.toLowerCase().includes(term)
    );
  }, [likedTracks, vaultSearch]);

  const toggleSelectAll = (list: any[]) => {
    const allIds = list.map(t => t.id);
    const allSelected = allIds.every(id => selectedTrackIds.includes(id));
    
    if (allSelected) {
      setSelectedTrackIds(prev => prev.filter(id => !allIds.includes(id)));
    } else {
      setSelectedTrackIds(prev => Array.from(new Set([...prev, ...allIds])));
    }
  };

  const filteredResults = useMemo(() => {
    if (!debouncedSearchTerm) return [];
    const term = debouncedSearchTerm.toLowerCase();
    
    // Combine Global Data + User's Sovereign Assets
    const pool = [...WAVE_QUERY_DATA, ...ownedDisplayList];
    
    // De-duplicate if needed (though IDs should be unique)
    const uniquePool = Array.from(new Map(pool.map(item => [item.id, item])).values());

    return uniquePool.filter(track => 
      track.title.toLowerCase().includes(term) || 
      track.category.toLowerCase().includes(term) ||
      track.isrc.toLowerCase().includes(term)
    );
  }, [debouncedSearchTerm, ownedDisplayList]);

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
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-secondary/60">{user ? user.email : T.power}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-sm md:text-lg font-black tabular-nums">{hashPower.toFixed(1)}</span>
                <Zap size={10} className="text-secondary" />
              </div>
              
              <div className="w-[1px] h-6 bg-white/10" />

              {user ? (
                <button 
                  onClick={() => { if(window.confirm(lang === 'KR' ? "로그아웃 하시겠습니까?" : "Logout?")) handleLogout(); }}
                  className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all group overflow-hidden"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={14} className="group-hover:scale-110 transition-transform" />
                  )}
                </button>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-white text-black text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_5px_15px_rgba(255,255,255,0.2)] flex items-center gap-1.5"
                >
                  <User size={10} />
                  {lang === 'KR' ? "로그인" : "Login"}
                </button>
              )}
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
              className="w-full h-full flex flex-col items-center pt-10 relative overflow-hidden"
            >
              {/* PERSISTENT SEARCH HEADER */}
              <motion.div 
                layout
                className={`w-full flex flex-col items-center gap-8 md:gap-12 transition-all duration-500 ${search ? 'mb-6' : 'mt-[10vh] mb-12'}`}
              >
                {!search && (
                  <motion.h1 
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-7xl font-black tracking-[0.3em] uppercase bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent leading-none text-center pl-[0.3em]"
                  >
                    {T.title}
                  </motion.h1>
                )}
                
                <div className="relative w-full max-w-2xl group px-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative flex items-center bg-white/[0.03] border-b border-white/10 focus-within:border-primary transition-all">
                    <Search className="absolute left-4 text-white/20 group-focus-within:text-primary w-5 h-5 md:w-6 md:h-6" />
                    <input 
                      type="text" 
                      placeholder={T.placeholder} 
                      className="w-full bg-transparent py-4 md:py-8 px-12 md:px-14 text-lg md:text-3xl font-medium focus:outline-none placeholder:text-white/5 tracking-tighter text-center"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {!search ? (
                  <motion.div 
                    key="recommendations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full space-y-4 px-2 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-primary rounded-full" />
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">FOR YOU: DAILY WAVE</h2>
                      </div>
                      <span className="text-[8px] font-black uppercase text-primary animate-pulse">Personalized Live</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                      {WAVE_QUERY_DATA.slice(0, 5).map((item) => (
                        <div 
                          key={`rec-${item.id}`}
                          onClick={() => { setActiveTrack(item); setPlaylist(WAVE_QUERY_DATA.slice(0, 5)); setIsPlaying(true); }}
                          className="min-w-[200px] md:min-w-[280px] premium-glass p-5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1">
                            <Activity size={12} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            {item.id.includes('1') && (
                              <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[6px] font-black tracking-widest uppercase">
                                Trending
                              </div>
                            )}
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
                  </motion.div>
                ) : (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex-1 flex flex-col overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-6 px-2">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{T.discoveries}</h2>
                      <button onClick={() => setSearch('')} className="text-[8px] font-black uppercase text-white/40 hover:text-white">{T.reset}</button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-48">
                      {filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
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
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20 gap-4">
                          <Search size={40} />
                          <p className="text-[10px] font-black uppercase tracking-widest">No results for "{search}"</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                <div className="flex gap-2">
                  <button 
                    onClick={() => playAll(filteredVaultList)}
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(239,68,68,0.3)]"
                  >
                    <Play size={12} fill="currentColor" /> {T.playAllVault}
                  </button>
                </div>
              </div>

              {/* VAULT LOCAL SEARCH & SELECT ALL */}
              <div className="px-2 mb-6 space-y-4">
                <div className="relative group">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder={lang === 'KR' ? "보관함 내 검색..." : "Search in Vault..."}
                    value={vaultSearch}
                    onChange={(e) => setVaultSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold focus:border-red-500/50 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => toggleSelectAll(filteredVaultList)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${filteredVaultList.length > 0 && filteredVaultList.every(t => selectedTrackIds.includes(t.id)) ? 'bg-red-500 border-red-500' : 'border-white/20 group-hover:border-red-500'}`}>
                      {filteredVaultList.length > 0 && filteredVaultList.every(t => selectedTrackIds.includes(t.id)) && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                      {lang === 'KR' ? "전체 선택" : "Select All"} ({filteredVaultList.length})
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 pb-48">
                {filteredVaultList.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => { setActiveTrack(item); setPlaylist(filteredVaultList); setIsPlaying(true); }} 
                    className={`premium-glass p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer transition-all ${activeTrack?.id === item.id ? 'bg-red-500/10 border-red-500/30' : 'hover:bg-red-500/5 group'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        onClick={(e) => toggleSelection(item.id, e)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${selectedTrackIds.includes(item.id) ? 'bg-red-500 border-red-500' : 'border-white/20 hover:border-red-500'}`}
                      >
                        {selectedTrackIds.includes(item.id) && <Check size={14} className="text-white" />}
                      </div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${activeTrack?.id === item.id ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500 group-hover:scale-105'}`}>
                        {activeTrack?.id === item.id && isPlaying ? <Activity size={18} className="animate-pulse" /> : <Play size={16} fill="currentColor" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm md:text-base tracking-tight">{item.title}</p>
                        <p className="text-[7px] font-black opacity-30 uppercase tracking-widest">{item.isrc}</p>
                      </div>
                    </div>
                    <button onClick={(e) => removeFromVault(item.id, e)} className="text-white/20 hover:text-red-500 transition-colors p-2">
                      <Trash2 size={16} />
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

              {/* VAULT SELECTION BAR */}
              <AnimatePresence>
                {selectedTrackIds.length > 0 && view === 'LIKES' && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-sm bg-red-600 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedTrackIds.length} {lang === 'KR' ? "곡 선택됨" : "Selected"}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedTrackIds([])} className="px-4 py-2 bg-black/20 rounded-lg text-[10px] font-black uppercase">Cancel</button>
                      <button onClick={() => playSelected(filteredVaultList)} className="px-6 py-2 bg-white text-red-600 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 shadow-xl">
                        <Play size={10} fill="currentColor" /> Play Selected
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {view === 'NODE' && (
            <motion.div 
              key="node"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col pt-4 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-4 mb-10 text-center">
                <div className="relative">
                  <Cpu size={28} className="text-primary" />
                  <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -inset-2 bg-primary/5 blur-xl rounded-full" />
                </div>
                <div className="flex flex-col items-center gap-1 mb-2">
                  <h2 className="text-xl md:text-2xl font-black tracking-[0.4em] uppercase leading-tight">{T.studio}</h2>
                  <div className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[6px] font-black tracking-widest uppercase">
                    v1.2 - NODE ACTIVE
                  </div>
                  <div 
                    onClick={triggerSync}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-100 transition-opacity opacity-60 mt-1"
                  >
                    <RefreshCw size={10} className={`text-primary ${isSyncing ? 'animate-spin' : ''}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary">
                      {isSyncing ? (lang === 'KR' ? "동기화 중..." : "Syncing...") : (lang === 'KR' ? "글로벌 노드 연결됨" : "Global Node Connected")}
                    </span>
                  </div>
                </div>
                
                {/* VISION PROCLAMATION CARD */}
                <button 
                  onClick={() => setShowVision(true)}
                  className="w-full max-w-xs premium-glass p-4 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between group hover:border-primary transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary text-black rounded-lg">
                      <TrendingUp size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest">{T.visionTitle}</p>
                      <p className="text-[7px] font-bold opacity-40 uppercase">{T.visionSubtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex flex-col items-center gap-4 w-full">
                  <input 
                    type="file" 
                    ref={singleInputRef} 
                    onChange={onFileChange} 
                    accept="audio/*,video/*"
                    multiple
                    className="hidden" 
                  />
                  <input 
                    type="file" 
                    ref={batchInputRef} 
                    onChange={onFileChange} 
                    accept="audio/*,video/*"
                    multiple
                    className="hidden" 
                  />
                  <div className="w-full max-w-sm flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 mb-2">
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30">Default Producer</span>
                      <input 
                        type="text"
                        value={defaultProducer}
                        onChange={(e) => {
                          setDefaultProducer(e.target.value);
                          localStorage.setItem('alpha_waverse_default_producer', e.target.value);
                        }}
                        className="bg-transparent text-[10px] font-black text-primary uppercase tracking-widest outline-none focus:border-b border-primary/30 w-32"
                      />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-[7px] font-bold opacity-20 leading-tight uppercase">Settings apply to new uploads</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    <button 
                      onClick={() => singleInputRef.current?.click()}
                      disabled={isUploading}
                      className="col-span-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                      {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                      {lang === 'KR' ? "자산 등록" : "Add Asset"}
                    </button>
                    <button 
                      onClick={() => batchInputRef.current?.click()}
                      disabled={isUploading}
                      className="col-span-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-primary px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all disabled:opacity-50"
                    >
                      {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Layers size={12} />}
                      {lang === 'KR' ? "Pro 대량 등록" : "Pro Batch Import"}
                    </button>
                    <button 
                      onClick={() => setShowImportModal(true)}
                      className="col-span-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      <Globe size={12} />
                      {lang === 'KR' ? "레거시 가져오기" : "Import Legacy"}
                    </button>
                    <button 
                      onClick={clearStudio}
                      className="col-span-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 size={12} />
                      {lang === 'KR' ? "초기화" : "Total Reset"}
                    </button>
                  </div>
                  <p className="text-[7px] font-black uppercase tracking-[0.2em] opacity-30">{T.formatHint}</p>
                </div>
              </div>

              {/* STUDIO LOCAL SEARCH & UNIFIED TOGGLE */}
              <div className="px-4 mb-6 space-y-4">
                <div className="relative group">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text"
                    placeholder={lang === 'KR' ? "스튜디오 내 검색..." : "Search in Studio..."}
                    value={studioSearch}
                    onChange={(e) => setStudioSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold focus:border-primary/50 outline-none transition-all"
                  />
                </div>
                
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2 cursor-pointer group" onClick={() => toggleSelectAll(filteredOwnedList)}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${filteredOwnedList.length > 0 && filteredOwnedList.every(t => selectedTrackIds.includes(t.id)) ? 'bg-primary border-primary' : 'border-white/20 group-hover:border-primary'}`}>
                      {filteredOwnedList.length > 0 && filteredOwnedList.every(t => selectedTrackIds.includes(t.id)) && <Check size={12} className="text-black" />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                      {lang === 'KR' ? "전체 선택" : "Select All"} ({filteredOwnedList.length})
                    </span>
                  </div>

                  <button 
                    onClick={() => setShowUnifiedLibrary(!showUnifiedLibrary)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all border ${showUnifiedLibrary ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
                  >
                    <Library size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      {lang === 'KR' ? "통합 라이브러리" : "Unified Library"}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${showUnifiedLibrary ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
                  </button>
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
                {filteredOwnedList.map(item => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <div 
                      onClick={() => { setActiveTrack(item as any); setPlaylist(filteredOwnedList as any); setIsPlaying(true); }} 
                      className={`premium-glass p-5 rounded-3xl border border-white/5 flex items-center justify-between transition-all cursor-pointer ${activeTrack?.id === item.id ? 'bg-primary/10 border-primary/30' : 'hover:bg-primary/5 group'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={(e) => toggleSelection(item.id, e)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${selectedTrackIds.includes(item.id) ? 'bg-primary border-primary' : 'border-white/20 hover:border-primary'}`}
                        >
                          {selectedTrackIds.includes(item.id) && <Check size={14} className="text-black" />}
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTrack?.id === item.id ? 'bg-primary text-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]' : 'bg-primary/10 text-primary group-hover:scale-105'}`}>
                          {activeTrack?.id === item.id && isPlaying ? (
                            <Activity size={20} className="animate-pulse" />
                          ) : item.type === 'Video' ? (
                            <div className="relative">
                              <Video size={20} />
                              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            </div>
                          ) : (
                            <CloudUpload size={20} />
                          )}
                        </div>
                        <div>
                          {item.title.includes('/') ? (
                            <>
                              <p className="text-sm md:text-base font-black tracking-tight">{item.title.split('/')[0].trim()}</p>
                              <p className="text-[8px] font-bold text-primary/60 uppercase tracking-widest -mt-0.5">
                                {item.title.split('/').slice(1).join(' x ')}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm md:text-base font-black tracking-tight">{item.title}</p>
                          )}
                          <div className="flex items-center gap-1.5 opacity-30 text-[8px] font-black uppercase tracking-widest mt-0.5">
                            <span className="text-primary">{item.type}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-white" />
                            <span className="text-primary">{customProducers[item.id] || "OWNER"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end mr-4">
                          <p className="text-[7px] font-black uppercase opacity-30 tracking-widest">Est. Revenue</p>
                          <p className="text-[10px] font-black text-primary tracking-tighter">$1,240.50</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(item as any);
                          }}
                          className="p-2 bg-white/5 rounded-full hover:bg-secondary/20 text-white/40 hover:text-secondary transition-all"
                        >
                          <RefreshCw size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(lang === 'KR' ? "수익 공유 링크가 생성되었습니다. 공유 시 귀하의 노드 점수가 상승합니다." : "Revenue share link created. Sharing increases your node score.");
                          }}
                          className="p-2 bg-white/5 rounded-full hover:bg-primary/20 text-white/40 hover:text-primary transition-all"
                        >
                          <Share2 size={16} />
                        </button>
                        <button 
                          onClick={(e) => deleteAsset(item.id, e)}
                          className="text-white/10 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Sub-Assets (Scores/MRs) */}
                    {generatedAssets[item.id] && (generatedAssets[item.id].scores.length > 0 || generatedAssets[item.id].mrs.length > 0) && (
                      <div className="ml-8 flex flex-col gap-2">
                        {generatedAssets[item.id].scores.map((score, sIdx) => (
                          <motion.div 
                            key={score}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <FileText size={14} className="text-primary" />
                              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Digital Score v{sIdx + 1}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => setShowScoreViewer(item.id)} className="text-[8px] font-black uppercase text-primary hover:underline">View</button>
                              <button className="p-1 text-white/20 hover:text-white"><Plus size={12} className="rotate-45" /></button>
                            </div>
                          </motion.div>
                        ))}
                        {generatedAssets[item.id].mrs.map((mr, mIdx) => (
                          <motion.div 
                            key={mr}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <Mic2 size={14} className="text-secondary" />
                              <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Vocal-Removed MR v{mIdx + 1}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => { setActiveTrack({ ...item, title: `${item.title} (MR)` } as any); setIsPlaying(true); }}
                                className="text-[8px] font-black uppercase text-secondary hover:underline"
                              >
                                Play
                              </button>
                              <button className="p-1 text-white/20 hover:text-white"><Plus size={12} className="rotate-45" /></button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {ownedDisplayList.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4 mt-20">
                    <MusicIcon size={40} strokeWidth={1} />
                    <p className="text-xs font-black uppercase tracking-widest">{lang === 'KR' ? "등록된 자산이 없습니다." : "No Assets in Studio"}</p>
                  </div>
                )}
              </div>

              {/* STUDIO SELECTION BAR */}
              <AnimatePresence>
                {selectedTrackIds.length > 0 && view === 'NODE' && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] w-[90%] max-w-sm bg-primary text-black rounded-2xl p-4 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.4)] flex items-center justify-between"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedTrackIds.length} {lang === 'KR' ? "곡 선택됨" : "Selected"}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedTrackIds([])} className="px-4 py-2 bg-black/10 rounded-lg text-[10px] font-black uppercase">Cancel</button>
                      <button onClick={() => setShowBatchEditModal(true)} className="px-4 py-2 bg-black/20 text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-2 border border-white/10 hover:bg-black/40 transition-all">
                        <RefreshCw size={10} /> {lang === 'KR' ? "일괄 수정" : "Batch Edit"}
                      </button>
                      <button onClick={deleteSelected} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-[10px] font-black uppercase">Delete</button>
                      <button onClick={() => playSelected(filteredOwnedList)} className="px-6 py-2 bg-black text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-2 shadow-xl">
                        <Play size={10} fill="currentColor" /> Play Selected
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                  onClick={() => handleAITask('SCORE')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group border border-white/5 hover:border-primary/30"
                >
                  <FileText size={12} className="group-hover:text-primary transition-colors" />
                  <span className="text-[8px] font-black uppercase tracking-wider">{T.score}</span>
                </button>
                <button 
                  onClick={() => handleAITask('MR')}
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

      {/* VISION PROCLAMATION MODAL */}
      <AnimatePresence>
        {showVision && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md premium-glass p-8 rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-primary" />
                  <h3 className="text-xl font-black uppercase tracking-widest">{T.visionTitle}</h3>
                </div>
                <button onClick={() => setShowVision(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <Plus className="rotate-45 opacity-40" />
                </button>
              </div>
              <div className="space-y-6 text-sm leading-relaxed opacity-80">
                <p className="font-bold text-primary italic">"창작자가 자신의 자산을 완전히 통제하는 '주권적 음악 경제'를 구축합니다."</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0"><Zap size={14} /></div>
                    <div>
                      <p className="font-black uppercase tracking-tighter text-[10px]">AI Hybrid IP</p>
                      <p className="text-[11px] opacity-60">AI 기술과 인간의 감각을 결합한 지식재산권의 진화</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowVision(false)}
                className="w-full mt-10 bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        onEnded={handleTrackEnd}
        className="hidden" 
      />

      <input 
        type="file" 
        ref={singleInputRef} 
        onChange={onFileChange} 
        accept="audio/*,video/*" 
        className="hidden" 
      />

      <input 
        type="file" 
        ref={batchInputRef} 
        onChange={onFileChange} 
        multiple
        accept="audio/*,video/*" 
        className="hidden" 
      />

      {/* AI PROCESSING OVERLAY */}
      <AnimatePresence>
        {isProcessingAI && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={32} className="text-primary animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-black tracking-[0.3em] uppercase mb-2">
              {aiTaskType === 'SCORE' ? "Analyzing Score" : "Extracting MR"}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 animate-pulse">
              {lang === 'KR' ? "AI 하이브리드 노드 연산 중..." : "AI HYBRID NODE COMPUTING..."}
            </p>
            <div className="mt-8 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCORE VIEWER MODAL */}
      <AnimatePresence>
        {showScoreViewer && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[250] bg-black flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 text-primary rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest">{WAVE_QUERY_DATA.find(t => t.id === showScoreViewer)?.title || customTitles[showScoreViewer]}</h3>
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Digital Sheet Music v1.0</p>
                </div>
              </div>
              <button 
                onClick={() => setShowScoreViewer(null)} 
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus className="rotate-45" size={24} />
              </button>
            </div>

            <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 overflow-y-auto shadow-[0_0_100px_rgba(255,255,255,0.1)] custom-scrollbar border-4 border-white/20">
              <div className="max-w-3xl mx-auto space-y-16 py-8">
                <div className="text-center space-y-4 mb-20">
                  <div className="w-16 h-1 w-full bg-black mx-auto opacity-10" />
                  <h1 className="text-5xl font-serif text-black font-bold uppercase tracking-tight">{WAVE_QUERY_DATA.find(t => t.id === showScoreViewer)?.title || customTitles[showScoreViewer]}</h1>
                  <p className="text-sm font-serif italic text-black/60 tracking-widest uppercase">Composed & Transcribed by Alpha AI Waverse Engine</p>
                  <div className="w-16 h-1 w-full bg-black mx-auto opacity-10" />
                </div>

                {/* Mock Sheet Music Representation */}
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-6 relative border-t-2 border-black/10 pt-10">
                    <div className="flex items-center gap-1 absolute -top-3 left-0 bg-white px-3 text-[10px] font-black text-black/40 tracking-[0.2em] uppercase">SECTION 0{i}</div>
                    
                    <div className="space-y-3">
                      <div className="h-[2px] bg-black/80 w-full" />
                      <div className="h-[2px] bg-black/80 w-full" />
                      <div className="h-[2px] bg-black/80 w-full" />
                      <div className="h-[2px] bg-black/80 w-full" />
                      <div className="h-[2px] bg-black/80 w-full" />
                    </div>
                    
                    <div className="absolute top-12 left-10 flex gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <div key={n} className="flex flex-col items-center">
                          <div className={`w-4 h-6 bg-black rounded-full rotate-[-20deg] ${n % 3 === 0 ? 'mt-4' : n % 2 === 0 ? 'mt-2' : ''}`} />
                          <div className="w-[1px] h-10 bg-black -mt-6 ml-4" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between px-2 text-[8px] font-black text-black/20 italic">
                      <span>C Maj 7 / G</span>
                      <span>D Min 9</span>
                      <span>G 13 (b9)</span>
                      <span>C Maj 9</span>
                    </div>
                  </div>
                ))}

                <div className="pt-20 text-center">
                  <p className="text-[10px] font-serif text-black/30 tracking-[0.3em] uppercase">© 2026 ALPHA WAVERSE ECOSYSTEM. ALL RIGHTS RESERVED.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-10">
              <button 
                onClick={() => alert(lang === 'KR' ? "📥 PDF 악보 다운로드 시작! 브라우저의 '다운로드' 폴더를 확인해 주세요." : "📥 Starting PDF download! Please check your browser's 'Downloads' folder.")}
                className="bg-primary text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)]"
              >
                Download PDF
              </button>
              <button 
                onClick={() => { setShowScoreViewer(null); alert("Saved to your Node Vault!"); }}
                className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Save to My Node
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REGISTRATION MODAL (DISTROKID STYLE) */}
      {/* PRO BATCH REGISTRATION MODAL */}
      <AnimatePresence>
        {showBatchModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[550] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg premium-glass p-8 md:p-12 rounded-[3rem] border border-primary/20 shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-widest">{lang === 'KR' ? "Pro 대량 등록" : "Pro Batch Registration"}</h3>
                    <p className="text-[10px] font-medium opacity-40 uppercase tracking-[0.2em]">{batchFiles.length} {lang === 'KR' ? "개 파일 선택됨" : "Files Selected"}</p>
                  </div>
                </div>
                <button onClick={() => setShowBatchModal(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <Plus className="rotate-45 opacity-40" size={32} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">01. {lang === 'KR' ? "공통 아티스트" : "Common Artist"}</label>
                    <input 
                      type="text" 
                      value={uploadArtist}
                      onChange={(e) => setUploadArtist(e.target.value)}
                      placeholder="e.g. Haerim (AI)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-primary outline-none transition-all placeholder:opacity-20 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">02. {lang === 'KR' ? "공통 프로듀서" : "Common Producer"}</label>
                    <input 
                      type="text" 
                      value={uploadProducer}
                      onChange={(e) => setUploadProducer(e.target.value)}
                      placeholder="e.g. K.Kim"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:border-primary outline-none transition-all placeholder:opacity-20 font-bold"
                    />
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-4 max-h-40 overflow-y-auto custom-scrollbar border border-white/5">
                  <p className="text-[8px] font-black uppercase opacity-40 mb-2">{lang === 'KR' ? "등록 대기 목록" : "Pending Queue"}</p>
                  <div className="space-y-2">
                    {batchFiles.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-[10px] opacity-60">
                        <MusicIcon size={10} className="text-primary" />
                        <span className="truncate font-medium">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleBatchUpload}
                  className="w-full bg-primary text-black py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)]"
                >
                  <Zap size={16} fill="currentColor" />
                  {lang === 'KR' ? "일괄 등록 및 주권 확보" : "Batch Register & Secure IP"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUploadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg premium-glass p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <MusicIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-widest">{lang === 'KR' ? "자산 등록 (Alpha Waverse)" : "Asset Registration"}</h3>
                    <p className="text-[10px] font-medium opacity-40 uppercase tracking-[0.2em]">Sovereign IP Management System</p>
                  </div>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <Plus className="rotate-45 opacity-40" size={32} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">01. {lang === 'KR' ? "곡 제목" : "Track Title"}</label>
                    <input 
                      type="text" 
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g. My Infinite Wave"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:border-primary outline-none transition-all placeholder:opacity-20"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">02. {lang === 'KR' ? "아티스트 / 사이버가수" : "Artist / Cyber Singer"}</label>
                    <input 
                      type="text" 
                      value={uploadArtist}
                      onChange={(e) => setUploadArtist(e.target.value)}
                      placeholder="e.g. Haerim (AI)"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:border-primary outline-none transition-all placeholder:opacity-20"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3 block">03. {lang === 'KR' ? "프로듀서 / 실제 제작자" : "Producer / Creator"}</label>
                    <input 
                      type="text" 
                      value={uploadProducer}
                      onChange={(e) => setUploadProducer(e.target.value)}
                      placeholder="e.g. K.Kim"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight focus:border-primary outline-none transition-all placeholder:opacity-20"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleFinalUpload}
                    className="w-full bg-primary text-black py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center gap-3"
                  >
                    <Globe size={18} />
                    {lang === 'KR' ? "자산 등록 및 주권 확보" : "Register & Secure Sovereignty"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEGACY IMPORT MODAL */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm premium-glass p-10 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-primary">
                  <Globe size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest mb-2">{lang === 'KR' ? "레거시 IP 연동" : "Legacy IP Link"}</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed">Enter ISRC to link your global assets to Alpha Waverse</p>
                </div>
                
                <input 
                  type="text" 
                  value={importIsrc}
                  onChange={(e) => setImportIsrc(e.target.value.toUpperCase())}
                  placeholder="e.g. KR-107-24-00001"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-sm font-black tracking-widest focus:border-primary outline-none transition-all placeholder:opacity-20"
                />

                <p className="text-[8px] font-medium opacity-40 leading-relaxed italic mt-2 px-4">
                  * Entering a valid ISRC will trigger our Global Oracle to fetch metadata and distribution history for unified management.
                </p>

                <div className="grid grid-cols-2 gap-3 w-full mt-4">
                  <button 
                    onClick={() => setShowImportModal(false)}
                    className="bg-white/5 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleImportLegacy}
                    disabled={isSyncing || !importIsrc}
                    className="bg-primary text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--primary-rgb),0.3)] disabled:opacity-30"
                  >
                    {isSyncing ? "Syncing..." : "Link Asset"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VISION PROCLAMATION MODAL */}
      <AnimatePresence>
        {showVision && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md premium-glass p-8 rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-primary" />
                  <h3 className="text-xl font-black uppercase tracking-widest">{T.visionTitle}</h3>
                </div>
                <button onClick={() => setShowVision(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <Plus className="rotate-45 opacity-40" />
                </button>
              </div>
              <div className="space-y-6 text-sm leading-relaxed opacity-80">
                <p className="font-bold text-primary italic">"창작자가 자신의 자산을 완전히 통제하는 '주권적 음악 경제'를 구축합니다."</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0"><Zap size={14} /></div>
                    <div>
                      <p className="font-black uppercase tracking-tighter text-[10px]">AI Hybrid IP</p>
                      <p className="text-[11px] opacity-60">AI 기술과 인간의 감각을 결합한 지식재산권의 진화</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowVision(false)}
                className="w-full mt-10 bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOVEREIGN AUTH MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm premium-glass p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              {/* Animated Background Decor */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 blur-[100px] rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-primary">
                  <ShieldCheck size={40} className={isAuthLoading ? "animate-pulse" : ""} />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-black uppercase tracking-[0.2em] mb-2">{lang === 'KR' ? "주권적 입장" : "Sovereign Entry"}</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest leading-relaxed">Connect to the Global Waverse Node</p>
                </div>

                <div className="w-full space-y-3">
                  <button 
                    onClick={() => handleAuth('GOOGLE')}
                    disabled={isAuthLoading}
                    className="w-full bg-white text-black py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>
                  
                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                    <div className="relative flex justify-center text-[8px] font-black uppercase text-white/20"><span className="bg-black/50 backdrop-blur-xl px-2">or Email Access</span></div>
                  </div>

                  <div className="space-y-4">
                    <input 
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="node-owner@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:border-primary outline-none transition-all placeholder:opacity-20"
                    />
                    <button 
                      onClick={() => handleAuth('EMAIL')}
                      disabled={isAuthLoading || !authEmail}
                      className="w-full bg-primary/10 border border-primary/20 text-primary py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all disabled:opacity-30"
                    >
                      {isAuthLoading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Access Node via Email"}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-[9px] font-black uppercase opacity-30 hover:opacity-100 transition-opacity tracking-widest"
                >
                  Return to Local Mode
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BATCH EDIT MODAL */}
      <AnimatePresence>
        {showBatchEditModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[750] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md premium-glass p-10 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest">{lang === 'KR' ? "선택 자산 일괄 수정" : "Batch Edit Selected"}</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest">{selectedTrackIds.length} Assets selected</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest text-center px-4 leading-relaxed">
                    {lang === 'KR' ? "입력한 항목만 모든 선택된 곡에 동일하게 적용됩니다. 제목은 유지됩니다." : "Only entered fields will be applied to all selected tracks. Titles remain unique."}
                  </p>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">{lang === 'KR' ? "공통 아티스트 / 연주자" : "Common Artist / Performer"}</label>
                    <input 
                      type="text"
                      value={batchArtist}
                      onChange={(e) => setBatchArtist(e.target.value)}
                      placeholder="Leave blank to keep original"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">{lang === 'KR' ? "공통 제작자 / 프로듀서" : "Common Creator / Producer"}</label>
                    <input 
                      type="text"
                      value={batchProducer}
                      onChange={(e) => setBatchProducer(e.target.value)}
                      placeholder="Leave blank to keep original"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setShowBatchEditModal(false)}
                    className="flex-1 py-4 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    {lang === 'KR' ? "취소" : "Cancel"}
                  </button>
                  <button 
                    onClick={handleBatchSave}
                    className="flex-1 py-4 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(var(--primary-rgb),0.3)]"
                  >
                    {lang === 'KR' ? "일괄 적용하기" : "Apply to All"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ASSET EDIT MODAL */}
      <AnimatePresence>
        {editingAssetId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[750] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md premium-glass p-10 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                    <RefreshCw size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest">{lang === 'KR' ? "메타데이터 수정" : "Edit Metadata"}</h3>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest">Asset ID: {editingAssetId}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">{lang === 'KR' ? "곡 제목" : "Track Title"}</label>
                    <input 
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-secondary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">{lang === 'KR' ? "아티스트 / 연주자" : "Artist / Performer"}</label>
                    <input 
                      type="text"
                      value={editArtist}
                      onChange={(e) => setEditArtist(e.target.value)}
                      placeholder="e.g. Luna AI, DJ Bujang"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-secondary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pl-1">{lang === 'KR' ? "제작자 / 프로듀서" : "Creator / Producer"}</label>
                    <input 
                      type="text"
                      value={editProducer}
                      onChange={(e) => setEditProducer(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-secondary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setEditingAssetId(null)}
                    className="flex-1 py-4 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    {lang === 'KR' ? "취소" : "Cancel"}
                  </button>
                  <button 
                    onClick={handleSaveEdit}
                    className="flex-1 py-4 rounded-2xl bg-secondary text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(var(--secondary-rgb),0.3)]"
                  >
                    {lang === 'KR' ? "저장하기" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {showVideoPlayer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-3xl flex flex-col p-4 md:p-10"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 text-primary rounded-2xl">
                  <Play size={24} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{customTitles[showVideoPlayer] || "Cinematic Asset"}</h3>
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Sovereign 4K Node Streaming</p>
                </div>
              </div>
              <button 
                onClick={() => setShowVideoPlayer(null)}
                className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <Plus className="rotate-45" size={32} />
              </button>
            </div>

            <div className="flex-1 bg-black rounded-[2.5rem] overflow-hidden relative group border border-white/5 shadow-2xl">
              <video 
                src={customUrls[showVideoPlayer]} 
                controls 
                autoPlay
                className="w-full h-full object-contain"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="bg-primary/80 backdrop-blur-md text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">LIVE NODE</div>
                <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Ultra HD</div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center px-4">
              <div className="flex items-center gap-6 text-white/40">
                <button 
                  onClick={() => alert(lang === 'KR' ? "글로벌 유통 엔진 가동: 전 세계 120개 플랫폼으로 배포를 시작합니다." : "Global Distribution Engine: Starting deployment to 120+ platforms.")}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Share2 size={16} />
                  <span className="text-[10px] font-black uppercase">Distribute</span>
                </button>
                <button 
                  onClick={() => alert(lang === 'KR' ? "실시간 자산 통계: 노드 전파율 및 예상 수익 데이터를 분석 중입니다." : "Real-time Stats: Analyzing node propagation and projected earnings.")}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <TrendingUp size={16} />
                  <span className="text-[10px] font-black uppercase">Stats</span>
                </button>
              </div>
              <button 
                onClick={() => {
                  alert(lang === 'KR' ? "🎉 마스터 NFT 민팅 완료! 귀하의 주권적 자산이 블록체인에 공식 등록되었습니다." : "🎉 Master NFT Minted! Your sovereign asset is now officially registered on-chain.");
                  setShowVideoPlayer(null); // Close the player as the final step
                }}
                className="bg-primary text-black px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)]"
              >
                Mint as Master NFT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
