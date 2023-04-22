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
import { useQuery } from "react-query";
import { addGame, getPlayersNicknames, getMapsList } from "./addGameFetchs";

function AddGame() {
  const { data: fetchedPlayersNicknames, isSuccess: nicknamesIsSuccess } =
    useQuery({
      queryFn: () => getPlayersNicknames(),
      queryKey: ["playersNicknames"],
    });

  let playersNicknames: string[] = [];
  if (nicknamesIsSuccess) {
    playersNicknames = fetchedPlayersNicknames;
  }

  const { data: fetchedMapsList, isSuccess: mapsIsSuccess } = useQuery({
    queryFn: () => getMapsList(),
    queryKey: ["mapsList"],
  });

  let mapsList: string[] = [];
  if (mapsIsSuccess) {
    mapsList = fetchedMapsList;
  }

  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const form = useForm<Map>({
    initialValues: {
      mapName: "",
      score: "",
      stats: [],
    },
  });

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
            addGame(values);
          })}
        >
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label="First bet"
              description="Заполните название карты и счет"
            >
              <Box maw={300} mx="auto">
                <Autocomplete
                  label="Карта"
                  data={mapsList}
                  {...form.getInputProps("mapName")}
                />
                <TextInput
                  label="Счет по раундам"
                  {...form.getInputProps("score")}
                />
              </Box>
            </Stepper.Step>
            <Stepper.Step label="Second bet" description="Внесите игроков">
              <Tabs defaultValue="0">
                <Tabs.List>
                  {form.values.stats.map((player, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Tabs.Tab value={String(index)}>
                      Player {index + 1}
                      <UnstyledButton
                        ml="xs"
                        onClick={() => form.removeListItem("stats", index)}
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
                {form.values.stats.map((player, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Tabs.Panel value={String(index)}>
                    <Group style={{ width: "400px" }} m="auto">
                      <Group>
                        <Autocomplete
                          label="Игрок"
                          data={playersNicknames}
                          {...form.getInputProps(`stats.${index}.nickname`)}
                        />
                      </Group>
                      <TextInput
                        label="Kills"
                        {...form.getInputProps(`stats.${index}.kills`)}
                      />
                      <TextInput
                        label="KD"
                        {...form.getInputProps(`stats.${index}.kd`)}
                      />
                      <TextInput
                        label="HS"
                        {...form.getInputProps(`stats.${index}.hs`)}
                      />
                    </Group>
                  </Tabs.Panel>
                ))}
              </Tabs>
              <Group position="center" mt="10px">
                <Button
                  onClick={() =>
                    form.insertListItem("stats", {
                      nickname: "",
                    })
                  }
                  disabled={form.values.stats.length >= 5}
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
