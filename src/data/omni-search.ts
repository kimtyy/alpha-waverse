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
    url: '/listen/hwb-vol5-01'
  },
  { 
    id: 'haerin-grannum', 
    title: '그 이름 (Seo Hae-rim)', 
    type: 'Music', 
    category: 'Ballad / AI Soul', 
    peerId: 'haerim-fan-node-7',
    url: '/listen/haerin-grannum'
  },
  { 
    id: 'bitvana-zen', 
    title: 'Deep Meditation Flow', 
    type: 'Music', 
    category: 'Lo-fi / Zen', 
    peerId: 'zen-master-node',
    url: '/listen/bitvana-zen'
  },
  { 
    id: 'alpha-rhythm-01', 
    title: 'Alpha Pulse Technology', 
    type: 'Music', 
    category: 'Focus / Ambient', 
    peerId: 'alpha-core-node-1',
    url: '/listen/alpha-rhythm-01'
  },
];
