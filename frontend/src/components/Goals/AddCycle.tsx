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

    const { RangePicker } = DatePicker

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
                    <ModalHeader>Crie seu ciclo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired isInvalid={!!errors.title}>
                            <FormLabel htmlFor="name">Nome</FormLabel>
                            <Input
                                id="name"
                                {...register("title", {
                                    required: "Conteúdo é obrigatório.",
                                })}
                                placeholder="Nomeie seu ciclo"
                                type="text"
                            />
                            {errors.title && (
                                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        
                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="timeCicle">Defina o tempo do ciclo</FormLabel>
                            <RangePicker
                                id="timeCicle"
                                size="large"
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                                placeholder={['Início do Ciclo', 'Término do Ciclo']}
                                getPopupContainer={(trigger) => trigger.parentElement || document.body} />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                            <FormLabel htmlFor="student">Estudante</FormLabel>
                            <Select id="student" placeholder="Selecione o estudante">
                                <option value='option1'>Eduardo</option>
                                <option value='option2'>Guilherme</option>
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

export default AddCycle
