import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { AppShell, Navbar, Header, Button, Title } from "@mantine/core";
import { Map } from "../components/LoadData";
import { isEmpty, findIndex, sortBy } from "lodash";
import { PlayerData } from "../components/LoadData";
import { useEffect, useState } from "react";
import { round } from "lodash";

interface PlayersData {
  nickname: string;
  matchCount: number;
  kills: [number];
  adr: [number];
  kd: [number];
  kr: [number];
  ef: [number];
  ud: [number];
}

export default function SummaryStats() {
  const [mapList, setMapList] = useState<Map[]>([]);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem("MapList")) {
      setMapList(JSON.parse(localStorage.getItem("MapList") as string));
    }
    if (localStorage.getItem("PlayersList")) {
      setPlayerList(JSON.parse(localStorage.getItem("PlayersList") as string));
    }
  }, []);

  const playersData: PlayersData[] = [];

  // Создание места и запись игроков в playerData
  if (!(isEmpty(playerList) || !playerList)) {
    const playerNicknameList = playerList;

    playerNicknameList.forEach((nick) => {
      playersData.push({
        nickname: nick,
        matchCount: 0,
        kills: [0],
        adr: [0],
        kd: [0],
        kr: [0],
        ud: [0],
        ef: [0],
      });
    });
  }

  // Запись статистики для каждого игрока в playerData
  if (!(isEmpty(mapList) || !mapList)) {
    let index = 0;
    const mapStatsList = mapList;
    mapStatsList.forEach((map) => {
      map.players.forEach((player) => {
        index = findIndex(playersData, { nickname: player.nickname });
        playersData[index].kills.push(player.kills);
        playersData[index].adr.push(player.adr);
        playersData[index].kd.push(player.kd);
        playersData[index].kr.push(player.kr);
        playersData[index].ef.push(player.ef);
        playersData[index].ud.push(player.ud);
        playersData[index].matchCount += 1;
      });
    });
  }
  // Вычисление итоговой статистики для каждого игрока
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playerData: PlayerData[] = [];
  playersData.forEach((player) => {
    console.log("1", player.nickname);
    console.log("2", player.kd);
    let length = player.kills.length - 1;
    let kills = 0,
      adr = 0,
      kr = 0,
      ef = 0,
      ud = 0,
      kd = 0;
    for (let i = 1; i < length + 1; i++) {
      console.log("3", player.kd[i]);
      kills += Number(player.kills[i]);
      adr += Number(player.adr[i]);
      kd += Number(player.kd[i]);
      kr += Number(player.kr[i]);
      ef += Number(player.ef[i]);
      ud += Number(player.ud[i]);
    }
    playerData.push({
      nickname: player.nickname,
      matchCount: player.matchCount,
      kills: round(kills / length, 1),
      adr: round(adr / length, 1),
      kd: round(kd / length, 1),
      kr: round(kr / length, 1),
      ef: round(ef / length, 1),
      ud: round(ud / length, 1),
    });
  });

  const [records, setRecords] = useState(sortBy(playerData, "matchCount"));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "matchCount",
    direction: "desc",
  });
  useEffect(() => {
    const data = sortBy(playerData, sortStatus.columnAccessor) as PlayerData[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [playerData, sortStatus]);

  console.log(playerData);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          {
            <a href="../">
              <Button w="100%" mt="20px">
                Вернуться на главную
              </Button>
            </a>
          }
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          {
            <Title order={3} weight={500} align="center">
              Общая статистика
            </Title>
          }
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {
        <DataTable
          withBorder
          borderRadius="sm"
          withColumnBorders
          striped
          highlightOnHover
          // provide data
          records={records}
          // define columns
          columns={[
            {
              accessor: "nickname",
              title: "NICKNAME",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "matchCount",
              title: "Matches",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "kills",
              title: "AVG",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "kd",
              title: "KD",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "adr",
              title: "ADR",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "kr",
              title: "KR",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "ef",
              title: "EF",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "ud",
              title: "UD",
              textAlignment: "center",
              sortable: true,
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          // execute this callback when a row is clicked
          /*onRowClick={({ name, party, bornIn }) =>
          alert(`You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`)
        }*/
        />
      }
    </AppShell>
  );
}
