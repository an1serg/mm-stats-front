export interface PlayerData {
  nickname: string;
  matchCount: number;
  kills: number;
  avg: number;
  kr: number;
  kd: number;
}

export interface Map {
  mapName: string;
  score: string;
  stats: PlayerData[];
}
