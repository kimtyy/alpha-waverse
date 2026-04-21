export interface SearchResult {
  id: string;
  title: string;
  type: 'Music'; // Strictly Music
  category: string;
  peerId?: string; // For P2P Music
  url: string;
}

export const WAVE_QUERY_DATA: SearchResult[] = [
  // Music (Alpha Wave P2P) - ONLY
  { 
    id: 'hwb-vol5-01', 
    title: 'Whiskey Blues (Sapphire Edition)', 
    type: 'Music', 
    category: 'Blues / Cinematic', 
    peerId: 'k-kim-nexus-1',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-1.mp3'
  },
  { 
    id: 'haerin-grannum', 
    title: '그 이름 (Seo Hae-rim)', 
    type: 'Music', 
    category: 'Ballad / AI Soul', 
    peerId: 'haerim-fan-node-7',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'bitvana-zen', 
    title: 'Deep Meditation Flow', 
    type: 'Music', 
    category: 'Lo-fi / Zen', 
    peerId: 'zen-master-node',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-2.mp3'
  },
  { 
    id: 'alpha-rhythm-01', 
    title: 'Alpha Pulse Technology', 
    type: 'Music', 
    category: 'Focus / Ambient', 
    peerId: 'alpha-core-node-1',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-2.mp3'
  },
  { 
    id: 'soul-orbit-02', 
    title: 'Midnight Seoul Soul', 
    type: 'Music', 
    category: 'Soul / R&B', 
    peerId: 'k-indie-node-9',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-1.mp3'
  },
  { 
    id: 'techno-wave-03', 
    title: 'Cyberpunk Awakening', 
    type: 'Music', 
    category: 'Techno / Electronic', 
    peerId: 'berlin-under-7',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'lofi-study-04', 
    title: 'Library Rain Beats', 
    type: 'Music', 
    category: 'Lo-fi / Chill', 
    peerId: 'study-girl-node',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-2.mp3'
  },
  { 
    id: 'jazz-node-05', 
    title: 'Blue Note Echoes', 
    type: 'Music', 
    category: 'Jazz / Acoustic', 
    peerId: 'ny-jazz-club',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-2.mp3'
  },
  { 
    id: 'k-pop-next-06', 
    title: 'Neo-Gwangju Dreams', 
    type: 'Music', 
    category: 'Future Pop', 
    peerId: 'korea-hq-alpha',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-1.mp3'
  },
  { 
    id: 'ambient-void-07', 
    title: 'Stellar Wind Voyager', 
    type: 'Music', 
    category: 'Ambient / Space', 
    peerId: 'nasa-audio-node',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-1.mp3'
  },
  { 
    id: 'blues-road-08', 
    title: 'Route 66 Dust', 
    type: 'Music', 
    category: 'Raw Blues', 
    peerId: 'texas-blues-man',
    url: '/audio/A-Letter-I-Never-Sent---Clara-Paige-1-1.mp3'
  },
  { 
    id: 'cinematic-epic-09', 
    title: 'Empire Rise Symphony', 
    type: 'Music', 
    category: 'Epic / Orchestral', 
    peerId: 'hollywood-score-4',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-2-2.mp3'
  },
  { 
    id: 'vocal-ai-10', 
    title: 'Synthetic Aurora', 
    type: 'Music', 
    category: 'AI Vocal / Trance', 
    peerId: 'vocaloid-omega',
    url: '/audio/-I-Still-Remember-Paris---Camille-Moreau-1-2.mp3'
  }
];
