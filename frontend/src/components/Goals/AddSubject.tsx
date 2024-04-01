import {
    Button,
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
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddSubjectProps {
    isOpen: boolean
    onClose: () => void
}

const AddSubject: React.FC<AddSubjectProps> = ({ isOpen, onClose }) => {
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
                    <ModalHeader>Adicione a disciplina</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="goal">Objetivo</FormLabel>
                            <Select id="goal" placeholder='Selecione o objetivo'>
                            <option value='option1'>Concurso 1</option>
                            <option value='option2'>Consurso 2</option>
                        </Select>
                        </FormControl>
                        
                        <FormControl mt={4} isRequired isInvalid={!!errors.title}>
                            <FormLabel htmlFor="title">Disciplina</FormLabel>
                            <Input
                                id="title"
                                {...register("title", {
                                    required: "Disciplina é obrigatório.",
                                })}
                                placeholder="Digite a disciplina"
                                type="text"
                            />
                            {errors.title && (
                                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                            )}
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

export default AddSubject
