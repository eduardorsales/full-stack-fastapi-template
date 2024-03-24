import { useQueryClient } from "react-query"
import {
  Box,
  Container,
  Text,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import type { UserOut } from "../../client"


export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const queryClient = useQueryClient()

  const currentUser = queryClient.getQueryData<UserOut>("currentUser")

  return (
    <>
      <Container maxW="full">
          <Box pt={12} m={4}>
            <Text fontSize="2xl">
              Olá, {currentUser?.full_name || currentUser?.email} 👋🏼
            </Text>
            <Text>Seja bem-vindo novamente!</Text>
          </Box>
      </Container>
    </>
  )
}

export default Dashboard
