import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="90%">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Text>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="green" onClick={onConfirm}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function DeleteAllTask({ deleteTaskAll }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDeleteAll() {
    deleteTaskAll();
    onClose();
  }

  return (
    <>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="8"
        onClick={onOpen}
      >
        Delete all tasks
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteAll}
        title="Are you sure you want to delete all tasks?"
        message="This action cannot be undone."
      />
    </>
  );
}

function DeleteTask({ task, deleteTask }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDeleteTask() {
    deleteTask(task.id);
    onClose();
  }

  return (
    <>
      <IconButton icon={<FiTrash2 />} isRound="true" onClick={onOpen} />

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteTask}
        title="Are you sure you want to delete this task?"
        message={`You are about to delete the task: "${task.body}". This action cannot be undone.`}
      />
    </>
  );
}

export { DeleteTask, DeleteAllTask };
