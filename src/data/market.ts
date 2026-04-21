export interface MarketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'Asset' | 'Booster' | 'License';
  image?: string;
  status: 'Available' | 'Sold Out';
}

export const ALPHA_MARKET_DATA: MarketItem[] = [
  {
    id: 'mkt-01',
    name: 'Midnight Sapphire Stem',
    description: '전 세계 1개 한정. Whiskey Blues Vol.5의 마스터 스템 소유권.',
    price: 45.5,
    type: 'Asset',
    status: 'Available'
  },
  {
    id: 'mkt-02',
    name: 'P2P Signal Booster v1',
    description: '내 노드의 리스너 도달 범위를 300% 확장하는 네트워크 증폭기.',
    price: 12.0,
    type: 'Booster',
    status: 'Available'
  },
  {
    id: 'mkt-03',
    name: 'Genesis Node License',
    description: '제국의 초기 수호자임을 증명하는 영구 라이선스. 채굴 효율 +15%.',
    price: 85.0,
    type: 'License',
    status: 'Available'
  },
  {
    id: 'mkt-04',
    name: 'Suno-Legacy Bundle',
    description: 'Suno AI로 생성된 초기 전설 음원 10선 패키지 소유권.',
    price: 28.5,
    type: 'Asset',
    status: 'Available'
  }
];
