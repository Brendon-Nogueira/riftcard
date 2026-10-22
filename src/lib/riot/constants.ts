import { RegionPlatform, RegionalCluster } from './types';

export const PLATFORM_TO_CLUSTER: Record<RegionPlatform, RegionalCluster> = {
  br1: 'americas',
  na1: 'americas',
  la1: 'americas',
  la2: 'americas',
  euw1: 'europe',
  eun1: 'europe',
  tr1: 'europe',
  ru: 'europe',
  kr: 'asia',
  jp1: 'asia',
  oc1: 'sea',
  ph2: 'sea',
  sg2: 'sea',
  th2: 'sea',
  tw2: 'sea',
  vn2: 'sea',
};

export const REGIONS_LIST: { id: RegionPlatform; label: string; flag: string }[] = [
  { id: 'br1', label: 'Brasil (BR1)', flag: '🇧🇷' },
  { id: 'na1', label: 'North America (NA1)', flag: '🇺🇸' },
  { id: 'kr', label: 'Korea (KR)', flag: '🇰🇷' },
  { id: 'euw1', label: 'Europe West (EUW1)', flag: '🇪🇺' },
  { id: 'eun1', label: 'Europe Nordic (EUN1)', flag: '🇪🇺' },
  { id: 'la1', label: 'LAN (LA1)', flag: '🇲🇽' },
  { id: 'la2', label: 'LAS (LA2)', flag: '🇦🇷' },
  { id: 'jp1', label: 'Japan (JP1)', flag: '🇯🇵' },
  { id: 'oc1', label: 'Oceania (OC1)', flag: '🇦🇺' },
];

export const TIER_CONFIG: Record<
  string,
  {
    name: string;
    borderGlow: string;
    solidBorder: string;
    surfaceBg: string;
    badgeColor: string;
    accentColor: string;
    textColor: string;
  }
> = {
  CHALLENGER: {
    name: 'Challenger',
    borderGlow: 'rgba(241, 168, 10, 0.4)',
    solidBorder: '#f1a80a',
    surfaceBg: '#0e1826',
    badgeColor: '#f1a80a',
    accentColor: '#ffe580',
    textColor: '#ffffff',
  },
  GRANDMASTER: {
    name: 'Grão-Mestre',
    borderGlow: 'rgba(224, 64, 64, 0.4)',
    solidBorder: '#e04040',
    surfaceBg: '#1f0a0e',
    badgeColor: '#e04040',
    accentColor: '#ff7373',
    textColor: '#ffffff',
  },
  MASTER: {
    name: 'Mestre',
    borderGlow: 'rgba(170, 75, 230, 0.4)',
    solidBorder: '#aa4be6',
    surfaceBg: '#170a24',
    badgeColor: '#aa4be6',
    accentColor: '#d696ff',
    textColor: '#ffffff',
  },
  DIAMOND: {
    name: 'Diamante',
    borderGlow: 'rgba(87, 174, 255, 0.4)',
    solidBorder: '#57aeff',
    surfaceBg: '#091829',
    badgeColor: '#57aeff',
    accentColor: '#96d1ff',
    textColor: '#ffffff',
  },
  EMERALD: {
    name: 'Esmeralda',
    borderGlow: 'rgba(38, 201, 131, 0.4)',
    solidBorder: '#26c983',
    surfaceBg: '#061a12',
    badgeColor: '#26c983',
    accentColor: '#75f7be',
    textColor: '#ffffff',
  },
  PLATINUM: {
    name: 'Platina',
    borderGlow: 'rgba(70, 195, 190, 0.4)',
    solidBorder: '#46c3be',
    surfaceBg: '#081c1c',
    badgeColor: '#46c3be',
    accentColor: '#8af0eb',
    textColor: '#ffffff',
  },
  GOLD: {
    name: 'Ouro',
    borderGlow: 'rgba(200, 170, 110, 0.4)',
    solidBorder: '#c8aa6e',
    surfaceBg: '#1c1508',
    badgeColor: '#c8aa6e',
    accentColor: '#f0e6d2',
    textColor: '#ffffff',
  },
  SILVER: {
    name: 'Prata',
    borderGlow: 'rgba(192, 199, 206, 0.35)',
    solidBorder: '#94a3b8',
    surfaceBg: '#0f172a',
    badgeColor: '#cbd5e1',
    accentColor: '#f8fafc',
    textColor: '#ffffff',
  },
  BRONZE: {
    name: 'Bronze',
    borderGlow: 'rgba(180, 115, 75, 0.35)',
    solidBorder: '#b4734b',
    surfaceBg: '#1a100a',
    badgeColor: '#b4734b',
    accentColor: '#e09e75',
    textColor: '#ffffff',
  },
  IRON: {
    name: 'Ferro',
    borderGlow: 'rgba(120, 115, 120, 0.35)',
    solidBorder: '#64748b',
    surfaceBg: '#0f1115',
    badgeColor: '#94a3b8',
    accentColor: '#cbd5e1',
    textColor: '#ffffff',
  },
  UNRANKED: {
    name: 'Sem Elo',
    borderGlow: 'rgba(10, 200, 185, 0.3)',
    solidBorder: '#0ac8b9',
    surfaceBg: '#040d1a',
    badgeColor: '#0ac8b9',
    accentColor: '#f0e6d2',
    textColor: '#ffffff',
  },
};
