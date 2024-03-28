import { createFileRoute } from '@tanstack/react-router'

import {
    Button,
    Stack,
    Heading,
    Card,
    CardHeader,
    CardBody,
    StackDivider,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Container,
    useBoolean,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Icon
} from "@chakra-ui/react";

import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type UserCreate, UsersService } from "../client"
import type { ApiError } from "../client/core/ApiError"
import useCustomToast from "../hooks/useCustomToast"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export const Route = createFileRoute('/register')({
    component: Register
})

interface UserCreateForm extends UserCreate {
    confirm_password: string
}

function Register() {
    const [show, setShow] = useBoolean()
    const queryClient = useQueryClient()
    const showToast = useCustomToast()

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<UserCreateForm>({
        mode: "onBlur",
        criteriaMode: "all",
        defaultValues: {
            email: "",
            full_name: "",
            password: "",
            confirm_password: "",
            is_superuser: false,
            is_active: true,
        },
    })

    const addUser = async (data: UserCreate) => {
        await UsersService.createUser({ requestBody: data })
    }

    const mutation = useMutation(addUser, {
        onSuccess: () => {
            showToast("Sucesso!", "Usuário criado com sucesso.", "success")
            reset()
        },
        onError: (err: ApiError) => {
            const errDetail = err.body?.detail
            showToast("Algo deu errado.", `${errDetail}`, "error")
        },
        onSettled: () => {
            queryClient.invalidateQueries("users")
        },
    })

    const onSubmit: SubmitHandler<UserCreateForm> = (data) => {
        mutation.mutate(data)
    }

    return (
        <Container>
            <Flex align="center" justify="center" h="100vh">
                <Card w="100%">
                    <CardHeader>
                        <Heading size='md'>CRIE SUA CONTA</Heading>
                    </CardHeader>

                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <FormControl w="full" px={3} isRequired isInvalid={!!errors.full_name}>
                                    <FormLabel htmlFor="grid-name" fontWeight="bold" color="gray.700">
                                        Nome completo
                                    </FormLabel>
                                    <Input
                                        id="grid-name"
                                        {...register("full_name", {
                                            required: "Nome é obrigatório"
                                        })}
                                        type="text"
                                        placeholder="Ex.: João da Silva"
                                        bg="gray.200"
                                        color="gray.700"
                                        border="1px"
                                        borderColor="gray.200"
                                        rounded="md"
                                        py={3}
                                        px={4}
                                        mb={3}
                                        _hover={{
                                            borderColor: "gray.500",
                                        }}
                                        _focus={{
                                            bg: "white",
                                            borderColor: "gray.500",
                                        }}
                                    />
                                    {errors.full_name && (
                                        <FormErrorMessage>{errors.full_name.message}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl w="full" px={3} isRequired isInvalid={!!errors.email}>
                                    <FormLabel htmlFor="grid-email" fontWeight="bold" color="gray.700">
                                        E-mail
                                    </FormLabel>
                                    <Input
                                        id="grid-email"
                                        {...register("email", {
                                            required: "E-mail é obrigatório",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "Endereço de e-mail inválido",
                                            },
                                        })}
                                        type="email"
                                        placeholder="Ex.: seuemail@email.com.br"
                                        bg="gray.200"
                                        color="gray.700"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        rounded="md"
                                        py={3}
                                        px={4}
                                        mb={3}
                                        _hover={{
                                            borderColor: "gray.500",
                                        }}
                                        _focus={{
                                            bg: "white",
                                            borderColor: "gray.500",
                                        }}
                                    />
                                    {errors.email && (
                                        <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl w="full" px={3} isRequired isInvalid={!!errors.password}>
                                    <FormLabel htmlFor="grid-password" fontWeight="bold" color="gray.700">
                                        Senha
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="grid-password"
                                            {...register("password", {
                                                required: "Senha é obrigatória",
                                                minLength: {
                                                    value: 8,
                                                    message: "A senha deve conter oito caracteres",
                                                },
                                            })}
                                            type={show ? "text" : "password"}
                                            placeholder="********"
                                            bg="gray.200"
                                            color="gray.700"
                                            border="1px"
                                            borderColor="gray.200"
                                            rounded="md"
                                            py={3}
                                            px={4}
                                            mb={3}
                                            _hover={{
                                                borderColor: "gray.500",
                                            }}
                                            _focus={{
                                                bg: "white",
                                                borderColor: "gray.500",
                                            }}
                                        />
                                        <InputRightElement
                                            color="gray.400"
                                            _hover={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Icon
                                                onClick={setShow.toggle}
                                                aria-label={show ? "Hide password" : "Show password"}
                                            >
                                                {show ? <ViewOffIcon /> : <ViewIcon />}
                                            </Icon>
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.password && (
                                        <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                                    )}
                                </FormControl>

                                <FormControl w="full" px={3} isRequired isInvalid={!!errors.confirm_password}>
                                    <FormLabel htmlFor="grid-confirmpassword" fontWeight="bold" color="gray.700">
                                        Confirme a senha
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="grid-confirmpassword"
                                            {...register("confirm_password", {
                                                required: "Por favor, confirme sua senha",
                                                validate: (value) =>
                                                    value === getValues().password ||
                                                    "As senhas digitadas não correspondem ou não são iguais",
                                            })}
                                            type={show ? "text" : "password"}
                                            placeholder="********"
                                            bg="gray.200"
                                            color="gray.700"
                                            border="1px"
                                            borderColor="gray.200"
                                            rounded="md"
                                            py={3}
                                            px={4}
                                            mb={3}
                                            _hover={{
                                                borderColor: "gray.500",
                                            }}
                                            _focus={{
                                                bg: "white",
                                                borderColor: "gray.500",
                                            }}
                                        />
                                        <InputRightElement
                                            color="gray.400"
                                            _hover={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Icon
                                                onClick={setShow.toggle}
                                                aria-label={show ? "Hide password" : "Show password"}
                                            >
                                                {show ? <ViewOffIcon /> : <ViewIcon />}
                                            </Icon>
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.confirm_password && (
                                        <FormErrorMessage>
                                            {errors.confirm_password.message}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <Button colorScheme='teal' size='md' type="submit" isLoading={isSubmitting}>
                                    Enviar
                                </Button>
                            </Stack>
                        </form>
                    </CardBody>
                </Card>
            </Flex>
        </Container>
    )
}