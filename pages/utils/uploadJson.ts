import { concat, isEmpty } from "lodash";
import { Map } from "../components/LoadData";
import { addToLocalStorage } from "./addToLocalStorage";
import { parsePlayersListFromStorage } from "./parsePlayersListFromStorage";

export const uploadJson = (mapList: Map[]) => {
  const MapList = localStorage.getItem("MapList");
  if (isEmpty(MapList) || !MapList) {
    localStorage.setItem("MapList", JSON.stringify(mapList));
    parsePlayersListFromStorage();
  } else {
    const newMapList = concat(JSON.parse(MapList), mapList);
    localStorage.setItem("MapList", JSON.stringify(newMapList));
    parsePlayersListFromStorage();
  }
  const updateLocalStorage = new Event("updateLocalStorage");
  dispatchEvent(updateLocalStorage);
};
