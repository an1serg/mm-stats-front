import { Map } from "../components/LoadData";
import { forEach, isEmpty, concat } from "lodash";
import { parsePlayersListFromStorage } from "./parsePlayersListFromStorage";
import { round } from "lodash";
export const addToLocalStorage = (map: Map) => {
  const MapList = localStorage.getItem("MapList");

  let roundsAmount =
    Number(map.score.split("-")[0]) + Number(map.score.split("-")[1]);
  forEach(map.players, (player) => {
    player.kr = round(player.kills / roundsAmount, 1);
  });

  if (isEmpty(MapList) || !MapList) {
    localStorage.setItem("MapList", JSON.stringify([map]));
    parsePlayersListFromStorage();
  } else {
    const newMapList = concat(map, JSON.parse(MapList));
    localStorage.setItem("MapList", JSON.stringify(newMapList));
    parsePlayersListFromStorage();
  }
  const updateLocalStorage = new Event("updateLocalStorage");
  dispatchEvent(updateLocalStorage);
};
