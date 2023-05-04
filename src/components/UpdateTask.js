import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";

function UpdateTask({ task, updateTask }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [body, setBody] = useState(task.body);
  const initialRef = useRef();

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleUpdateTask = () => {
    updateTask(task.id, body, onClose);
  };

  return (
    <>
      <IconButton icon={<FiEdit />} isRound onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Update your task:</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Enter your task"
                value={body}
                onChange={handleBodyChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleUpdateTask}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateTask;
