import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"

import { type ApiError, type UserOut, UsersService } from "../../client"
import useAuth from "../../hooks/useAuth"
import useCustomToast from "../../hooks/useCustomToast"

interface DeleteProps {
  isOpen: boolean
  onClose: () => void
}

const DeleteConfirmation: React.FC<DeleteProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const currentUser = queryClient.getQueryData<UserOut>("currentUser")
  const { logout } = useAuth()

  const deleteCurrentUser = async (id: number) => {
    await UsersService.deleteUser({ userId: id })
  }

  const mutation = useMutation(deleteCurrentUser, {
    onSuccess: () => {
      showToast(
        "Sucesso",
        "Sua conta foi deletada com sucesso.",
        "success",
      )
      logout()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = err.body?.detail
      showToast("Algo deu errado.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries("currentUser")
    },
  })

  const onSubmit = async () => {
    mutation.mutate(currentUser!.id)
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
            <AlertDialogHeader>Confirmação Obrigatória</AlertDialogHeader>

            <AlertDialogBody>
              Todos os dados da sua conta serão{" "}
              <strong>permanentemente deletados.</strong> Se você tem certeza,
              clique em <strong>"Confirmar"</strong> para prosseguir. Esta ação não
              pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter gap={3}>
              <Button variant="danger" type="submit" isLoading={isSubmitting}>
                Confirmar
              </Button>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={isSubmitting}
              >
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteConfirmation
