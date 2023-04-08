import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  Text,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { uploadJson } from "../../utils/uploadJson";

export function UploadGames() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <Dropzone
          onDrop={(files) => {
            files[0].text().then((value) => {
              uploadJson(JSON.parse(JSON.parse(value + "")));
            });
          }}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={["application/json"]}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Modal>

      <Group position="center">
        <Button onClick={open} fullWidth mb="20px">
          Загрузить игры
        </Button>
      </Group>
    </>
  );
}
