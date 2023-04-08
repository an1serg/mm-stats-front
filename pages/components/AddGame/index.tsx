import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  TextInput,
  Autocomplete,
  Box,
  Stepper,
  Tabs,
  UnstyledButton,
} from "@mantine/core";
import { IconCircleX } from "@tabler/icons-react";
import * as _ from "lodash";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { type } from "os";
import { PlayerData, Map } from "../LoadData";
import { addToLocalStorage } from "/pages/utils/addToLocalStorage";
import { map } from "lodash";

function AddGame() {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);
  const [mapsList, setMapsList] = useState<string[]>([]);
  const [playersList, setPlayersList] = useState<string[]>([]);
  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem("MapsList")) {
      setMapsList(JSON.parse(localStorage.getItem("MapsList") as string));
    }
    if (localStorage.getItem("PlayersList")) {
      setPlayersList(JSON.parse(localStorage.getItem("PlayersList") as string));
    }
  }, []);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const form = useForm<Map>({
    initialValues: {
      mapName: "Dust 2",
      score: "",
      id: "",
      players: [],
    },
  });
  // console.log(JSON.stringify(myData));
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Добавление статистики"
        centered
        size={"xl"}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            values.id = `${values.mapName}_${values.players
              .map((player) => player.nickname)
              .join("_")}_${Date.now()}`;
            addToLocalStorage(values);
          })}
        >
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="First bet"
              description="Заполните название карты и счет"
            >
              <Box maw={300} mx="auto">
                <Group position="apart">
                  <Autocomplete
                    label="Карта"
                    data={mapsList}
                    style={{ width: "130px" }}
                    {...form.getInputProps("mapName")}
                  />
                  <Button
                    mt="25px"
                    onClick={() => {
                      //findindex
                      if (
                        _.indexOf(mapsList, `${form.values.mapName}`) === -1
                      ) {
                        setMapsList(_.concat(mapsList, form.values.mapName));
                        localStorage.setItem(
                          "MapsList",
                          JSON.stringify(
                            _.concat(mapsList, form.values.mapName)
                          )
                        );
                      }
                    }}
                  >
                    Добавить карту
                  </Button>
                </Group>
                <TextInput
                  label="Счет по раундам"
                  {...form.getInputProps("score")}
                />
              </Box>
            </Stepper.Step>
            <Stepper.Step label="Second bet" description="Внесите игроков">
              <Tabs defaultValue="0">
                <Tabs.List>
                  {form.values.players.map((player, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Tabs.Tab value={String(index)}>
                      Player {index + 1}
                      <UnstyledButton
                        ml="xs"
                        onClick={() => form.removeListItem("players", index)}
                      >
                        <IconCircleX
                          size={24}
                          strokeWidth={2}
                          color={"#228be6"}
                        />
                      </UnstyledButton>
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                {form.values.players.map((player, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Tabs.Panel value={String(index)}>
                    <Group style={{ width: "400px" }} m="auto">
                      <Group>
                        <Autocomplete
                          label="Игрок"
                          data={playersList}
                          {...form.getInputProps(`players.${index}.nickname`)}
                        />
                        <Button
                          mt="xl"
                          onClick={() => {
                            //findindex
                            if (
                              _.indexOf(
                                playersList,
                                `${form.values.players[index].nickname}`
                              ) === -1
                            ) {
                              setPlayersList(
                                _.concat(
                                  playersList,
                                  form.values.players[index].nickname
                                )
                              );
                              localStorage.setItem(
                                "PlayersList",
                                JSON.stringify(
                                  _.concat(
                                    playersList,
                                    form.values.players[index].nickname
                                  )
                                )
                              );
                            }
                          }}
                        >
                          Добавить
                        </Button>
                      </Group>
                      <TextInput
                        label="Kills"
                        {...form.getInputProps(`players.${index}.kills`)}
                      />
                      <TextInput
                        label="KD"
                        {...form.getInputProps(`players.${index}.kd`)}
                      />
                      <TextInput
                        label="ADR"
                        {...form.getInputProps(`players.${index}.adr`)}
                      />
                      <TextInput
                        label="EF"
                        {...form.getInputProps(`players.${index}.ef`)}
                      />
                      <TextInput
                        label="UD"
                        {...form.getInputProps(`players.${index}.ud`)}
                      />
                    </Group>
                  </Tabs.Panel>
                ))}
              </Tabs>
              <Group position="center" mt="10px">
                <Button
                  onClick={() =>
                    form.insertListItem("players", {
                      nickname: "",
                      kills: 0,
                      adr: 0,
                      ef: 0,
                      ud: 0,
                    })
                  }
                  disabled={form.values.players.length >= 5}
                >
                  Добавить игрока
                </Button>
              </Group>
            </Stepper.Step>
            <Stepper.Step label="Final bet" description="Завершение">
              <Button type="submit">Завершить</Button>
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </form>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Modal>

      <Group position="center" mb="20px">
        <Button onClick={open} fullWidth>
          Добавить новую игру
        </Button>
      </Group>
    </>
  );
}

export default AddGame;
