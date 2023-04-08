export interface PlayerData {
  nickname: string;
  matchCount: number;
  kills: number;
  adr: number;
  kr: number;
  kd: number;
  ef: number;
  ud: number;
}

export interface Map {
  mapName: string;
  score: string;
  id: string;
  players: PlayerData[];
}
