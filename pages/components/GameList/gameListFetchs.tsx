import axios from "axios";
import { Map } from "../LoadData";

interface Player {
  nickname: string;
}

export interface Game {
  id: number;
  mapName: string;
  score: string;
}

const BASE = "http://localhost:5000";

export async function getPlayersNicknames(): Promise<string[]> {
  try {
    const playersInfo = await axios.get(`${BASE}/players`);
    const playersNicknames = playersInfo.data.map(
      (player: Player) => player.nickname
    );
    console.log(playersNicknames);
    return playersNicknames;
  } catch (error) {
    console.log("Error in getPlayer");
    return [];
  }
}

export async function getAllGames(): Promise<Game[]> {
  try {
    const allGamesInfo: Game[] = (await axios.get(`${BASE}/games`)).data;
    return allGamesInfo;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getStatsByGameId(gameId: number): Promise<Map> {
  const gameStats: Map = (await axios.get(`${BASE}/games/${gameId}`)).data;
  return gameStats;
}
