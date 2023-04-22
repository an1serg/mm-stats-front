import { AppShell, Navbar, Header, Button, ScrollArea } from "@mantine/core";
import MainLink from "../MainLink";
import AddGame from "../AddGame";
import { Summary } from "../Summary";
import { useState, useEffect, useCallback } from "react";
import { Map } from "../LoadData";
import { useQuery } from "react-query";
import { getAllGames, Game, getStatsByGameId } from "./gameListFetchs";

interface GameListProps {
  setCurrentMap: (mapId: number) => void;
}

const GameList = ({ setCurrentMap }: GameListProps) => {
  const { data: fetchedGameList, isSuccess } = useQuery({
    queryFn: () => getAllGames(),
    queryKey: ["allGames"],
  });
  const buldiga = useCallback(
    (mapId: number) => {
      setCurrentMap(mapId);
    },
    [setCurrentMap]
  );
  console.log(fetchedGameList, "FetchedGameList");

  return (
    <Navbar width={{ base: 350 }} height="100%" p="xs">
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Summary />
        <AddGame />
        {isSuccess &&
          fetchedGameList.map((game) => (
            <MainLink
              label={game.score}
              color={"black"}
              key={game.id}
              onClick={() => {
                console.log(game.id, "onClicl");
                console.log(setCurrentMap);
                buldiga(game.id);
              }}
              currentMap={game.mapName}
            />
          ))}
      </Navbar.Section>
    </Navbar>
  );
};

export default GameList;
