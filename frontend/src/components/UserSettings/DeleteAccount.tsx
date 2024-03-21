import {
  Button,
  Container,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import type React from "react"

import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount: React.FC = () => {
  const confirmationModal = useDisclosure()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          Deletar Conta
        </Heading>
        <Text>
          Exclua permanentemente seus dados e tudo associado ao seu
          conta.
        </Text>
        <Button variant="danger" mt={4} onClick={confirmationModal.onOpen}>
          Deletar
        </Button>
        <DeleteConfirmation
          isOpen={confirmationModal.isOpen}
          onClose={confirmationModal.onClose}
        />
      </Container>
    </>
  )
}
export default DeleteAccount
