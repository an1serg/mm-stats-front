import { Button } from "@mantine/core";
import downloadJson from "../../utils/downloadJson";

export function DownloadGames() {
  return (
    <Button
      fullWidth
      mb="20px"
      onClick={() => {
        const MapList = localStorage.getItem("MapList");
        downloadJson(JSON.stringify(MapList));
      }}
    >
      Скачать игры
    </Button>
  );
}
