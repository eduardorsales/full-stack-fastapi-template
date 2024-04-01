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
                    <ModalHeader>Adicione seu desempenho em questões</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="content">Conteúdo</FormLabel>
                            <Select id="content" placeholder="Selecione o conteúdo">
                                <option value='option1'>Compreensão e interpretação de textos de gêneros variados</option>
                                <option value='option2'> Reconhecimento de tipos e gêneros textuais</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="totalQuestions">Total de questões</FormLabel>
                            <Input
                                id="totalQuestions"
                                type="number"
                                placeholder="Digite o total de questões"
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="correctQuestions">Questões acertadas</FormLabel>
                            <Input
                                id="correctQuestions"
                                type="number"
                                placeholder="Digite o número de questões acertadas"
                            />
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
