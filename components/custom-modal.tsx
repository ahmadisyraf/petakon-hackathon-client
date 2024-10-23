import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { CloseIcon, Icon } from "./ui/icon";
import { Heading } from "./ui/heading";
import { Center } from "./ui/center";
import { ReactNode } from "react";

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  body: ReactNode;
  footer: ReactNode;
  showCloseButton?: boolean;
}

export default function CustomModal({
  open,
  setOpen,
  title,
  body,
  footer,
  showCloseButton,
}: CustomModalProps) {
  return (
    <Center className="h-full">
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        size="md"
        closeOnOverlayClick={false}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {title}
            </Heading>
            {showCloseButton && (
              <ModalCloseButton onPress={() => setOpen(false)}>
                <Icon
                  as={CloseIcon}
                  size="md"
                  className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                />
              </ModalCloseButton>
            )}
          </ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
