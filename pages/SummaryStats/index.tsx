import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { AppShell, Navbar, Header, Button, Title } from "@mantine/core";
import { isEmpty, findIndex, sortBy } from "lodash";
import { PlayerData } from "../components/LoadData";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { calculateSummaryStats, getSummaryStats } from "./summaryStatsFetchs";

export default function SummaryStats() {
  const {} = useQuery({
    queryFn: () => calculateSummaryStats(),
    queryKey: ["caclStats"],
  });

  const { data, isSuccess } = useQuery({
    queryFn: () => getSummaryStats(),
    queryKey: ["summaryStats"],
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let summaryStats: PlayerData[] = [];
  if (isSuccess) {
    summaryStats = data;
  }
  const [records, setRecords] = useState(sortBy(summaryStats, "matchCount"));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "matchCount",
    direction: "desc",
  });
  useEffect(() => {
    const data = sortBy(
      summaryStats,
      sortStatus.columnAccessor
    ) as PlayerData[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [summaryStats, sortStatus]);
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
          records={records}
          columns={[
            {
              accessor: "nickname",
              title: "NICKNAME",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "mapsPlayed",
              title: "Matches",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "avg",
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
              accessor: "hs",
              title: "HS %",
              textAlignment: "center",
              sortable: true,
            },
            {
              accessor: "kr",
              title: "KR",
              textAlignment: "center",
              sortable: true,
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
        />
      }
    </AppShell>
  );
}
