import { useState, useEffect } from "react";
import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  useToast,
  Link,
  Flex,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaGithub, FaLinkedin } from "react-icons/fa";
import TaskList from "./components/tasks";
import AddTask from "./components/AddTask";

function App() {
  const toast = useToast();
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const deleteTaskAll = () => {
    setTasks([]);
  };

  const checkTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, check: !task.check };
        }
        return task;
      })
    );
  };

  const updateTask = (id, body, onClose) => {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Please enter a task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, body, check: false };
        }
        return task;
      })
    );

    onClose();
  };

  const onAddTask = (task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4} minH="100vh" pb={28}>
      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound={true}
        size="md"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />

      <Heading
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, green.300, green.400)"
        bgClip="text"
      >
        TaskMate
      </Heading>

      <AddTask onAddTask={onAddTask} />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />

      <Flex position="absolute" bottom="5">
        <Link href="https://github.com/Iulian-U" target="_blank">
          <IconButton icon={<FaGithub />} isRound={true} size="md" m="1" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/iulian-ursu-28006625a/"
          target="_blank"
        >
          <IconButton icon={<FaLinkedin />} isRound={true} size="md" m="1" />
        </Link>
      </Flex>
    </VStack>
  );
}

export default App;
