export interface SearchResult {
  id: string;
  title: string;
  type: 'Music' | 'Video'; 
  category: string;
  peerId?: string;
  isrc: string; // Added ISRC
  url: string;
}

export const WAVE_QUERY_DATA: SearchResult[] = [
  { 
    id: 'hwb-vol5-01', 
    title: 'Whiskey Blues (Sapphire Edition)', 
    type: 'Music', 
    category: 'Blues / Cinematic', 
    peerId: 'k-kim-nexus-1',
    isrc: 'ISRC-KOR-2026-001',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-1.mp3'
  },
  { 
    id: 'haerin-grannum', 
    title: '그 이름 (Seo Hae-rim)', 
    type: 'Music', 
    category: 'Ballad / AI Soul', 
    peerId: 'haerim-fan-node-7',
    isrc: 'ISRC-KOR-2026-002',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'bitvana-zen', 
    title: 'Deep Meditation Flow', 
    type: 'Music', 
    category: 'Lo-fi / Zen', 
    peerId: 'zen-master-node',
    isrc: 'ISRC-KOR-2026-003',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-2.mp3'
  },
  { 
    id: 'alpha-rhythm-01', 
    title: 'Alpha Pulse Technology', 
    type: 'Music', 
    category: 'Focus / Ambient', 
    peerId: 'alpha-core-node-1',
    isrc: 'ISRC-KOR-2026-004',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-2.mp3'
  },
  { 
    id: 'soul-orbit-02', 
    title: 'Midnight Seoul Soul', 
    type: 'Music', 
    category: 'Soul / R&B', 
    peerId: 'k-indie-node-9',
    isrc: 'ISRC-KOR-2026-005',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-1.mp3'
  },
  { 
    id: 'techno-wave-03', 
    title: 'Cyberpunk Awakening', 
    type: 'Music', 
    category: 'Techno / Electronic', 
    peerId: 'berlin-under-7',
    isrc: 'ISRC-KOR-2026-006',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'lofi-study-04', 
    title: 'Library Rain Beats', 
    type: 'Music', 
    category: 'Lo-fi / Chill', 
    peerId: 'study-girl-node',
    isrc: 'ISRC-KOR-2026-007',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-2.mp3'
  },
  { 
    id: 'jazz-node-05', 
    title: 'Blue Note Echoes', 
    type: 'Music', 
    category: 'Jazz / Acoustic', 
    peerId: 'ny-jazz-club',
    isrc: 'ISRC-KOR-2026-008',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-2.mp3'
  },
  { 
    id: 'k-pop-next-06', 
    title: 'Neo-Gwangju Dreams', 
    type: 'Music', 
    category: 'Future Pop', 
    peerId: 'korea-hq-alpha',
    isrc: 'ISRC-KOR-2026-009',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-1.mp3'
  },
  { 
    id: 'ambient-void-07', 
    title: 'Stellar Wind Voyager', 
    type: 'Music', 
    category: 'Ambient / Space', 
    peerId: 'nasa-audio-node',
    isrc: 'ISRC-KOR-2026-010',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-1.mp3'
  },
  { 
    id: 'blues-road-08', 
    title: 'Route 66 Dust', 
    type: 'Music', 
    category: 'Raw Blues', 
    peerId: 'texas-blues-man',
    isrc: 'ISRC-KOR-2026-011',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'cinematic-epic-09', 
    title: 'Empire Rise Symphony', 
    type: 'Music', 
    category: 'Epic / Orchestral', 
    peerId: 'hollywood-score-4',
    isrc: 'ISRC-KOR-2026-012',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-2.mp3'
  },
  { 
    id: 'vocal-ai-10', 
    title: 'Synthetic Aurora', 
    type: 'Music', 
    category: 'AI Vocal / Trance', 
    peerId: 'vocaloid-omega',
    isrc: 'ISRC-KOR-2026-013',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-2.mp3'
  }
];
