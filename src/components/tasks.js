import React from "react";
import UpdateTask from "./UpdateTask";
import { DeleteTask, DeleteAllTask } from "./DeleteTask";
import {
  HStack,
  Box,
  VStack,
  Flex,
  Text,
  StackDivider,
  Image,
} from "@chakra-ui/react";
import emptyListImage from "../images/NoTask.svg";

function TaskList({ tasks, updateTask, deleteTask, deleteTaskAll, checkTask }) {
  const isTaskListEmpty = tasks.length === 0;

  return (
    <>
      {isTaskListEmpty ? (
        <Box maxW="80%">
          <Image
            mt="20px"
            w="98%"
            maxW="350"
            src={emptyListImage}
            alt="emptyListImage"
          />
        </Box>
      ) : (
        <>
          <VStack
            divider={<StackDivider />}
            borderColor="gray.100"
            borderWidth="2px"
            p="5"
            borderRadius="lg"
            w="100%"
            maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
            alignItems="stretch"
          >
            {tasks.map((task) => (
              <HStack
                key={task.id}
                opacity={task.check ? "0.2" : "1"}
                alignItems="center"
              >
                <Text
                  flex="1"
                  p="8px"
                  borderRadius="lg"
                  as={task.check ? "s" : ""}
                  cursor="pointer"
                  onClick={() => checkTask(task.id)}
                >
                  {task.body}
                </Text>
                <DeleteTask
                  task={task}
                  deleteTask={deleteTask}
                  deleteTaskAll={deleteTaskAll}
                />
                <UpdateTask task={task} updateTask={updateTask} />
              </HStack>
            ))}
          </VStack>

          <Flex justify="flex-end">
            <DeleteAllTask deleteTaskAll={deleteTaskAll} />
          </Flex>
        </>
      )}
    </>
  );
}

export default TaskList;
