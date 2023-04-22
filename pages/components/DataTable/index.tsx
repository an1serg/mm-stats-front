import { Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Map } from "../LoadData";
import { useQuery } from "react-query";
import { getStatsByGameId } from "../GameList/gameListFetchs";

interface GettingStartedExampleProps {
  mapId: number;
}

function GettingStartedExample({ mapId }: GettingStartedExampleProps) {
  const { data, isSuccess } = useQuery({
    queryFn: () => getStatsByGameId(mapId),
    queryKey: [`statsByGameId${mapId}`],
  });
  console.log(data);
  console.log(mapId, "mapId");
  return (
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      records={data?.stats}
      columns={[
        {
          accessor: "nickname",
          title: "NICKNAME",
        },
        {
          accessor: "kills",
          title: "Kills",
          textAlignment: "center",
        },
        {
          accessor: "kd",
          title: "KD",
          textAlignment: "center",
        },
        {
          accessor: "hs",
          title: "HS %",
          textAlignment: "center",
        },
        {
          accessor: "kr",
          title: "KR",
          textAlignment: "center",
        },
      ]}
    />
  );
}

export default GettingStartedExample;
