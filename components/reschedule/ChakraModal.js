import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import InnerModal from './InnerModal';

const ChakraModal = ({ isOpen, onClose, data }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>RescheduleDate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InnerModal data={data} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChakraModal;
