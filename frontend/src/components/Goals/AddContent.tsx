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
                    <ModalHeader>Adicione o conteúdo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="subject">Disciplina</FormLabel>
                            <Select id="subject" placeholder='Selecione o objetivo'>
                                <option value='option1'>Português</option>
                                <option value='option2'>Inglês</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4} isRequired isInvalid={!!errors.title}>
                            <FormLabel htmlFor="title">Conteúdo</FormLabel>
                            <Input
                                id="title"
                                {...register("title", {
                                    required: "Conteúdo é obrigatório.",
                                })}
                                placeholder="Digite o conteúdo"
                                type="text"
                            />
                            {errors.title && (
                                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel htmlFor="description">Descrição</FormLabel>
                            <Input
                                size="lg"
                                id="description"
                                {...register("description")}
                                placeholder="Digite a descrição"
                                type="text"
                            />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="subject">Nível</FormLabel>
                            <Select id="subject" placeholder='Selecione o objetivo'>
                                <option value='option1'>Básica</option>
                                <option value='option2'>Específica</option>                                
                            </Select>
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
