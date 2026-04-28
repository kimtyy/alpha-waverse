export interface SearchResult {
  id: string;
  title: string;
  type: 'Music' | 'Video'; 
  category: string;
  peerId?: string;
  isrc: string; // Added ISRC
  url: string;
}

export const WAVE_QUERY_DATA: SearchResult[] = [];
