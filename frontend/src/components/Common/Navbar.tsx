import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import type React from "react"
import { FaPlus } from "react-icons/fa"

import AddUser from "../Admin/AddUser"
import AddItem from "../Items/AddItem"
import AddSubject from "../Goals/AddSubject"
import AddContent from "../Goals/AddContent"
import AddCycle from "../Goals/AddCycle"
import AddCycleSubject from "../Goals/AddCycleSubject"
import AddPhase from "../Goals/AddPhase"
import AddQuestions from "../Goals/AddQuestions"
import AddHistory from "../Goals/AddHistory"

interface NavbarProps {
  type: string
}

const Navbar: React.FC<NavbarProps> = ({ type }) => {
  const addUserModal = useDisclosure()
  const addItemModal = useDisclosure()
  const addSubjectModal = useDisclosure()
  const addContentModal = useDisclosure()
  const addCycleModal = useDisclosure()
  const addCycleSubjectModal = useDisclosure()
  const addPhasesModal = useDisclosure()
  const addQuestionsModal = useDisclosure()
  const addHistoryModal = useDisclosure()

  return (
    <>
      <Flex py={3} mb={4} gap={4}>
        {/* TODO: Complete search functionality */}
        {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaSearch} color='gray.400' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search' fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
                </InputGroup> */}
        <Button
          variant="primary"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
          onClick={() => {
            if (type === "User") {
              addUserModal.onOpen();
            } else if (type === "Objetivo") {
              addItemModal.onOpen();
            } else if (type === "Disciplina") {
              addSubjectModal.onOpen();
            } else if (type === "Conteúdo") {
              addContentModal.onOpen();
            } else if (type === "Ciclo") {
              addCycleModal.onOpen();
            } else if (type === "Disciplinas") {
              addCycleSubjectModal.onOpen();
            } else if (type === "Fases") {
              addPhasesModal.onOpen();
            } else if (type === "Questões") {
              addQuestionsModal.onOpen();
            } else if (type === "Histórico") {
              addHistoryModal.onOpen();
            }            
          }}
        >
          <Icon as={FaPlus} /> Adicionar {type}
        </Button>
        <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
        <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
        <AddSubject isOpen={addSubjectModal.isOpen} onClose={addSubjectModal.onClose}/> 
        <AddContent isOpen={addContentModal.isOpen} onClose={addContentModal.onClose}/>
        <AddCycle isOpen={addCycleModal.isOpen} onClose={addCycleModal.onClose}/>
        <AddCycleSubject isOpen={addCycleSubjectModal.isOpen} onClose={addCycleSubjectModal.onClose}/>
        <AddPhase isOpen={addPhasesModal.isOpen} onClose={addPhasesModal.onClose}/>
        <AddQuestions isOpen={addQuestionsModal.isOpen} onClose={addQuestionsModal.onClose}/>
        <AddHistory isOpen={addHistoryModal.isOpen} onClose={addHistoryModal.onClose}/>
      </Flex>
    </>
  )
}

export default Navbar
