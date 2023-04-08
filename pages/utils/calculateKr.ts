import { forEach } from "lodash";
import { Map } from "../components/LoadData";

export const calculateKr = (map: Map) => {
  let roundsAmount =
    Number(map.score.split("-")[0]) + Number(map.score.split("-")[1]);
  forEach(map.players, (player) => {
    player.kr = player.kills / roundsAmount;
  });
};
