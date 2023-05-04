import { useState } from "react";
import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";

function AddTask({ onAddTask }) {
  const toast = useToast();
  const [taskText, setTaskText] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTaskText = taskText.trim();

    if (!trimmedTaskText) {
      setIsInputInvalid(true);

      toast({
        title: "Please enter a task!",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const task = {
      id: nanoid(),
      body: trimmedTaskText,
      isComplete: false,
    };

    onAddTask(task);
    setTaskText("");
  };

  const handleTaskTextChange = (e) => {
    const { value } = e.target;
    setTaskText(value);
    setIsInputInvalid(false);
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} alignItems="center" mb="4">
      <Input
        flex="1"
        h="46"
        borderColor={isInputInvalid ? "red.300" : "transparent"}
        variant="filled"
        placeholder="Enter a task"
        value={taskText}
        onChange={handleTaskTextChange}
      />
      <Button ml="2" colorScheme="green" h="46" type="submit">
        Add
      </Button>
    </Flex>
  );
}

export default AddTask;
