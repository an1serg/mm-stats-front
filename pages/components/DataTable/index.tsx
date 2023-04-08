import { Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { Map } from "../LoadData";

interface GettingStartedExampleProps {
  map?: Map;
}

function GettingStartedExample({ map }: GettingStartedExampleProps) {
  return (
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={map?.players}
      // define columns
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
          accessor: "adr",
          title: "ADR",
          textAlignment: "center",
        },
        {
          accessor: "kr",
          title: "KR",
          textAlignment: "center",
        },
        {
          accessor: "ef",
          title: "EF",
          textAlignment: "center",
        },
        {
          accessor: "ud",
          title: "UD",
          textAlignment: "center",
        },
      ]}
      // execute this callback when a row is clicked
      /*onRowClick={({ name, party, bornIn }) =>
          alert(`You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`)
        }*/
    />
  );
}

export default GettingStartedExample;
