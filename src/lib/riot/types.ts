export type RegionPlatform =
  | 'br1'
  | 'na1'
  | 'la1'
  | 'la2'
  | 'euw1'
  | 'eun1'
  | 'tr1'
  | 'ru'
  | 'kr'
  | 'jp1'
  | 'oc1'
  | 'ph2'
  | 'sg2'
  | 'th2'
  | 'tw2'
  | 'vn2';

export type RegionalCluster = 'americas' | 'europe' | 'asia' | 'sea';

export type CardThemeId =
  | 'hextech'
  | 'victorious'
  | 'spirit-blossom'
  | 'zaun'
  | 'dragonmancer';

export interface CardTheme {
  id: CardThemeId;
  name: string;
  subtitle: string;
  primaryColor: string; // Solid accent color
  secondaryColor: string; // Aged metallic border color
  backgroundColor: string; // Deep noble dark surface
  surfaceColor: string; // Inner panel solid color
  glowColor: string; // Occlusion contact shadow / border highlight
  textColor: string; // High-contrast solid text
  badgeColor: string; // Insignia accent
  accentDot: string;
}

export interface RiotAccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface RiotSummonerDto {
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface RiotLeagueEntryDto {
  leagueId: string;
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | string;
  tier: string;
  rank: string;
  puuid: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export interface RiotChampionMasteryDto {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted?: boolean;
  tokensEarned?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'playstyle' | 'veteran' | 'performance' | 'fun';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ChampionMasteryCardInfo {
  championId: number;
  championName: string;
  championTitle: string;
  championLevel: number;
  championPoints: number;
  iconUrl: string;
  splashUrl: string;
  winrate: number;
  games: number;
  kda: number;
}

export interface RankedTierInfo {
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winrate: number;
}

export interface CombatMetrics {
  dpm: number;
  dpmTopPercent: number;
  visionScore: number;
  visionTopPercent: number;
  killParticipation: number;
  csPerMin: number;
  epicMonsterControl: number;
  seasonFeats: {
    highestDamage: string;
    longestWinStreak: number;
    pentakills: number;
    quadrakills: number;
  };
}

export interface PlayerCardData {
  puuid: string;
  riotId: string;
  gameName: string;
  tagLine: string;
  region: RegionPlatform;
  regionLabel: string;
  summonerLevel: number;
  profileIconUrl: string;
  soloTier: RankedTierInfo;
  flexTier?: RankedTierInfo;
  topChampions: ChampionMasteryCardInfo[];
  badges: Badge[];
  serialNumber: string;
  playstyle: {
    primaryRole: string;
    totalMasteryScore: number;
    championCount: number;
    monoScorePercentage: number;
  };
  combatMetrics: CombatMetrics;
  cardRankStyle: {
    tier: string;
    borderGlow: string;
    solidBorder: string;
    badgeColor: string;
    romanNumeral: string;
    accentColor: string;
  };
  generatedAt: string;
}
