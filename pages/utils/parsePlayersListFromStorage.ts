import { concat, indexOf, isEmpty } from "lodash";
import { Map } from "../components/LoadData";

export const parsePlayersListFromStorage = () => {
  const mapList = localStorage.getItem("MapList");
  const tempPlayerList = localStorage.getItem("PlayersList");
  let storagePlayerList = tempPlayerList ? JSON.parse(tempPlayerList) : [];
  if (!(isEmpty(mapList) || !mapList)) {
    const playersList: Map[] = JSON.parse(mapList);
    playersList.forEach((element) => {
      element.players.forEach((player) => {
        if (indexOf(storagePlayerList, player.nickname) === -1) {
          storagePlayerList = concat(storagePlayerList, player.nickname);
        }
      });
    });
  }
  localStorage.setItem("PlayersList", JSON.stringify(storagePlayerList));
};
