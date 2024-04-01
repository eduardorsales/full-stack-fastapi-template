import {
    Container,
    Divider,
    Flex,
    Heading,
    Progress,    
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react"

import type React from "react"
import { useQuery } from "react-query"

import { type ApiError, ItemsService } from "../../client"
import ActionsMenu from "../Common/ActionsMenu"
import Navbar from "../Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

const QuestionsTab: React.FC = () => {
    const showToast = useCustomToast()
    const {
        data: items,
        isLoading,
        isError,
        error,
    } = useQuery("items", () => ItemsService.readItems({}))

    if (isError) {
        const errDetail = (error as ApiError).body?.detail
        showToast("Algo deu errado.", `${errDetail}`, "error")
    }

    return (
        <>
            {isLoading ? (
                <Flex justify="center" align="center" height="100vh" width="full">
                    <Spinner size="xl" color="ui.main" />
                </Flex>
            ) : (
                items && (
                    <Container maxW="full">
                        <Flex direction="row">
                            <Navbar type={"Questões"} />
                        </Flex>
                        <Heading size='lg'>Desempenho</Heading>
                        <Divider mt={2} />
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Conteúdo</Th>
                                        <Th>Questões Resolvidas</Th>
                                        <Th>Questões Acertadas</Th>
                                        <Th>Porcentagem</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Compreensão e interpretação de textos de gêneros variados</Td>
                                        <Td>20</Td>
                                        <Td>10</Td>
                                        <Td>
                                            50%
                                            <Progress mt={1} hasStripe colorScheme='red' size='xs' value={50} />
                                        </Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Reconhecimento de tipos e gêneros textuais</Td>
                                        <Td>25</Td>
                                        <Td>20</Td>
                                        <Td>
                                            80%
                                            <Progress mt={1} hasStripe colorScheme='green' size='xs' value={80} />
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Container>
                )
            )}
        </>
    )
}

export default QuestionsTab