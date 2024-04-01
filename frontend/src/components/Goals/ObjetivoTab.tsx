import {
    Container,
    Divider,
    Flex,
    Heading,
    Spinner,   
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react"

import type React from "react"
import { useQuery } from "react-query"

import { type ApiError, ItemsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

const ObjetivoTab: React.FC = () => {
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
                        <Navbar type={"Objetivo"} />
                        <Heading size='lg'>Seus Objetivos</Heading>
                        <Divider mt={2} />
                        <TableContainer>
                            <Table fontSize="lg" size={{ base: "sm", md: "md" }}>
                                <Thead>
                                    <Tr>
                                        <Th>Objetivo</Th>
                                        <Th>Descrição</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {items.data.map((item) => (
                                        <Tr key={item.id}>
                                            <Td>{item.title}</Td>
                                            <Td color={!item.description ? "gray.400" : "inherit"}>
                                                {item.description || "N/A"}
                                            </Td>
                                            <Td>
                                                <ActionsMenu type={"Item"} value={item} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Container>
                )
            )}
        </>
    )
}

export default ObjetivoTab
