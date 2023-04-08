import Head from "next/head";
import { QueryClient, useQuery } from "react-query";
import { Inter } from "next/font/google";
import useStyles from "./styles";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Button } from "@mantine/core";
import GameList from "./components/GameList";
import MyAppShell from "./components/MyAppShell";
import GettingStartedExample from "./components/DataTable";

import { Children, useState } from "react";
import { Map } from "./components/LoadData";
const inter = Inter({ subsets: ["latin"] });

// const getMapData = async (context) => console.log(context);

export default function Home() {
  // const { data, isLoading, isFetching } = useQuery("maps", getMapData);
  // console.log(data);
  const { classes } = useStyles();
  const [currentMap, setCurrentMap] = useState<Map>();
  return (
    <>
      <Head>
        <title>BEBE MM STATS</title>
        <meta name="description" content="Generated by Riasets" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <MyAppShell>{<GettingStartedExample map={currentMap} />}</MyAppShell> */}
        <AppShell
          className={classes.main}
          padding="md"
          navbar={<GameList setCurrentMap={setCurrentMap} />}
          header={
            <Header height={60} p="xl">
              Здесь мы будем собирать статистику всех
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
          {<GettingStartedExample map={currentMap} />}
        </AppShell>
      </main>
    </>
  );
}