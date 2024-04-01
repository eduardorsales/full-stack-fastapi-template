import {
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

import { DatePicker } from 'antd';


interface AddCycleProps {
    isOpen: boolean
    onClose: () => void
}

const AddCycle: React.FC<AddCycleProps> = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient()
    const showToast = useCustomToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ItemCreate>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const addItem = async (data: ItemCreate) => {
        await ItemsService.createItem({ requestBody: data })
    }

    const mutation = useMutation(addItem, {
        onSuccess: () => {
            showToast("Sucesso!", "Objetivo criado com suceso.", "success")
            reset()
            onClose()
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail
            showToast("Algo deu errado.", `${errDetail}`, "error")
        },
        onSettled: () => {
            queryClient.invalidateQueries("items")
        },
    })

    const onSubmit: SubmitHandler<ItemCreate> = (data) => {
        mutation.mutate(data)
    }


    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: "sm", md: "md" }}
                isCentered
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Adicione as disciplinas ao ciclo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="ciclo">Ciclo</FormLabel>
                            <Select id="studenciclot" placeholder="Selecione o ciclo">
                                <option value='option1'>Ciclo 1</option>
                                <option value='option2'>Ciclo 2</option>
                            </Select>
                        </FormControl>
                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="subject">Disciplina(s)</FormLabel>
                            <CheckboxGroup colorScheme='green'>
                                <Stack spacing={[1, 1]} direction={['row', 'column']}>
                                    <Checkbox value='Português'>Português</Checkbox>
                                    <Checkbox value='Inglês'>Inglês</Checkbox>
                                    <Checkbox value='Espanhol'>Espanhol</Checkbox>
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>
                        
                    </ModalBody>

                    <ModalFooter gap={3}>
                        <Button variant="primary" type="submit" isLoading={isSubmitting}>
                            Salvar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddCycle
