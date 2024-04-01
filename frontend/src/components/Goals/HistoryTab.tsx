import {
    CircularProgress,
    CircularProgressLabel,
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
import dayjs from 'dayjs'
import { DatePicker } from "antd"

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

    const startDate = dayjs('2022-01-01')

    return (
        <>
            {isLoading ? (
                <Flex justify="center" align="center" height="100vh" width="full">
                    <Spinner size="xl" color="ui.main" />
                </Flex>
            ) : (
                items && (
                    <Container maxW="full">
                        <Navbar type={"Histórico"} />
                        <Heading size='lg'>Histórico</Heading>
                        <Divider mt={2} />
                        <TableContainer>
                            <Table fontSize="lg" size={{ base: "sm", md: "md" }}>
                                <Thead>
                                    <Tr>
                                        <Th>Ciclo</Th>
                                        <Th>Desempenho</Th>
                                        <Th>Data de Conclusão</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {items.data.map((item) => (
                                        <Tr key={item.id}>
                                            <Td>Ciclo 1</Td>
                                            <Td>
                                                <CircularProgress ml={1} value={65} color='green.400'>
                                                    <CircularProgressLabel>65%</CircularProgressLabel>
                                                </CircularProgress>
                                            </Td>
                                            <Td>
                                                <DatePicker
                                                id="timeCicle"
                                                size="large"                                                
                                                format="DD/MM/YYYY"
                                                placeholder={'Data de Conclusão'}
                                                value={startDate}                                                
                                                />
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
