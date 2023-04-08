import { AppShell, Header } from "@mantine/core";

interface AppShellProps {}

const MyAppShell: React.FC<React.PropsWithChildren<AppShellProps>> = ({
  children,
}) => {
  return (
    <AppShell
      // className={classes.main}
      padding="md"
      // navbar={<GameList setCurrentMap={setCurrentMap} />}
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
      {children}
    </AppShell>
  );
};

export default MyAppShell;
