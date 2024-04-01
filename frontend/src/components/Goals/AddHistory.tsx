import {
    Button,
    FormControl,
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
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { DatePicker } from "antd"

interface AddQuestionsProps {
    isOpen: boolean
    onClose: () => void
}

const AddQuestions: React.FC<AddQuestionsProps> = ({ isOpen, onClose }) => {
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
                    <ModalHeader>Crie seu histórico de desempenho</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="cycle">Ciclo</FormLabel>
                            <Select id="cycle" placeholder="Selecione o ciclo">
                                <option value='option1'>Ciclo 1</option>
                                <option value='option2'>Ciclo 2</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="score">Desempenho no ciclo</FormLabel>
                            <Input
                                id="score"
                                type="number"
                                placeholder="Digite o desempenho em cada ciclo"
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="timeCicle">Selecione a data de conclusão</FormLabel>
                            <DatePicker
                                id="timeCicle"
                                size="large"
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder={'Data de Conclusão'}
                                getPopupContainer={(trigger) => trigger.parentElement || document.body} />
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

export default AddQuestions
