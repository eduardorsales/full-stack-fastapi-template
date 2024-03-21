import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react"
import type React from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "react-query"

import { type ApiError, type UpdatePassword, UsersService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface UpdatePasswordForm extends UpdatePassword {
  confirm_password: string
}

const ChangePassword: React.FC = () => {
  const color = useColorModeValue("inherit", "ui.white")
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  })

  const UpdatePassword = async (data: UpdatePassword) => {
    await UsersService.updatePasswordMe({ requestBody: data })
  }

  const mutation = useMutation(UpdatePassword, {
    onSuccess: () => {
      showToast("Sucesso!", "Senha atualizada.", "success")
      reset()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Algo deu errado.", `${errDetail}`, "error")
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Container maxW="full" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Heading size="sm" py={4}>
          Alterar Senha
        </Heading>
        <Box w={{ sm: "full", md: "50%" }}>
          <FormControl isRequired isInvalid={!!errors.current_password}>
            <FormLabel color={color} htmlFor="current_password">
              Senha atual
            </FormLabel>
            <Input
              id="current_password"
              {...register("current_password")}
              placeholder="********"
              type="password"
            />
            {errors.current_password && (
              <FormErrorMessage>
                {errors.current_password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!errors.new_password}>
            <FormLabel htmlFor="password">Nova senha</FormLabel>
            <Input
              id="password"
              {...register("new_password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve conter oito caracteres",
                },
              })}
              placeholder="********"
              type="password"
            />
            {errors.new_password && (
              <FormErrorMessage>{errors.new_password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={!!errors.confirm_password}>
            <FormLabel htmlFor="confirm_password">Confirme a senha</FormLabel>
            <Input
              id="confirm_password"
              {...register("confirm_password", {
                required: "Por favor, confirme sua senha",
                validate: (value) =>
                  value === getValues().new_password ||
                  "As senhas digitadas não correspondem ou não são iguais",
              })}
              placeholder="********"
              type="password"
            />
            {errors.confirm_password && (
              <FormErrorMessage>
                {errors.confirm_password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Button
            variant="primary"
            mt={4}
            type="submit"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default ChangePassword
