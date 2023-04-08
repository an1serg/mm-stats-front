import { AppShell, Navbar, Header, Button, ScrollArea } from "@mantine/core";
import MainLink from "../MainLink";
import AddGame from "../AddGame";
import { DownloadGames } from "../DownloadGames";
import { UploadGames } from "../UploadGames";
import { Summary } from "../Summary";
import { useState, useEffect, useCallback } from "react";
import { Map } from "../LoadData";

interface GameListProps {
  setCurrentMap: (map: Map) => void;
}

const games: string[] = ["maxim", "sasa", "geva"];
const GameList = ({ setCurrentMap }: GameListProps) => {
  const [mapList, setMapList] = useState<Map[]>([]);

  const updateMapList = useCallback(() => {
    if (localStorage.getItem("MapList")) {
      setMapList(JSON.parse(localStorage.getItem("MapList") as string));
    }
  }, [setMapList]);

  useEffect(() => {
    if (localStorage.getItem("MapList")) {
      setMapList(JSON.parse(localStorage.getItem("MapList") as string));
    }
    addEventListener("updateLocalStorage", updateMapList);
    return () => {
      removeEventListener("updateLocalStorage", updateMapList);
    };
  }, [updateMapList]);
  return (
    <Navbar width={{ base: 350 }} height="100%" p="xs">
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Summary />
        <DownloadGames />
        <AddGame />
        <UploadGames />
        {
          //games.map((value:string) => <MainLink label={value} color='grey' key={value}/>)
          mapList.map((map) => (
            <MainLink
              label={map.score}
              color={"black"}
              key={map.id}
              onClick={() => setCurrentMap(map)}
              currentMap={map.mapName}
            />
          ))
        }
      </Navbar.Section>
    </Navbar>
  );
};

export default GameList;
