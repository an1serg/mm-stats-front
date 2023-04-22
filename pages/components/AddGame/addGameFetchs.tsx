import axios from "axios";
import { forEach } from "lodash";
import { PlayerData, Map } from "../LoadData";

interface Player {
  nickname: string;
}

interface Game {
  mapName: string;
}

const BASE = "http://localhost:5000";

export async function addGame(map: Map) {
  try {
    const res = await axios.post(`${BASE}/games/add`, map);
    //console.log(res);
  } catch (error) {
    console.log("Error in addGame");
  }
}

export async function getPlayersNicknames(): Promise<string[]> {
  try {
    const playersInfo = await axios.get(`${BASE}/players`);
    const playersNicknames = playersInfo.data.map(
      (player: Player) => player.nickname
    );
    return playersNicknames;
  } catch (error) {
    console.log("Error in getPlayer");
    return [];
  }
}

export async function getMapsList(): Promise<string[]> {
  try {
    const gamesInfo = await axios.get(`${BASE}/games`);
    const allMapsList = gamesInfo.data.map((game: Game) => game.mapName);

    const filteredMapsList = allMapsList.filter((item: any, index: any) => {
      return allMapsList.indexOf(item) == index;
    });

    return filteredMapsList;
  } catch (error) {
    console.log("Error in getMapsList");
    return [];
  }
}
