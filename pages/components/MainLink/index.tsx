import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  BackgroundImage,
} from "@mantine/core";

interface MainLinkProps {
  icon?: React.ReactNode;
  color: string;
  label: string;
  onClick: () => void;
  currentMap: string;
}

interface mapSources {
  [mapName: string]: string;
}

function MainLink({ icon, color, label, onClick, currentMap }: MainLinkProps) {
  const mapSources: mapSources = {
    Dust2: "https://www.hltv.org/img/static/maps/dust2.png",
    Mirage: "https://www.hltv.org/img/static/maps/mirage.png",
    Cache: "https://www.hltv.org/img/static/maps/cache.png",
  };
  const leftWinBackground =
    "linear-gradient(90deg, rgba(28,158,0,1) 0%, rgba(255,255,255,0) 100%)";
  const rightWinBackground =
    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(28,158,0,1) 100%)";
  const leftLoseBackground =
    "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,255,0) 100%";
  const rightLoseBackground =
    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,0,0,1) 100%)";
  return (
    <UnstyledButton
      mb="sm"
      style={{
        backgroundImage: `url(${mapSources[currentMap.split(" ").join("")]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "320px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "3px solid black",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      onClick={() => onClick()}
    >
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "white",
          fontWeight: "bold",
          position: "relative",
          zIndex: "10",
          padding: "0 40px 0 12px",
          background: `${
            label.split("-")[0] === "16"
              ? leftWinBackground
              : leftLoseBackground
          }`,
        }}
      >
        {label.split("-")[0]}
      </Group>
      <Group
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {currentMap}
      </Group>
      <Group
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "white",
          fontWeight: "bold",
          position: "relative",
          zIndex: "10",
          padding: "0 12px 0 40px",
          background: `${
            label.split("-")[1] === "16"
              ? rightWinBackground
              : rightLoseBackground
          }`,
        }}
      >
        {label.split("-")[1]}
      </Group>
    </UnstyledButton>
  );
}

export default MainLink;
