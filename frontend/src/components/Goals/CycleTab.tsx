import {
    Container,
    Divider,
    Flex,
    Heading,
    Spacer,
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
import { DatePicker } from "antd"
import dayjs from 'dayjs'

import { type ApiError, ItemsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"
import useCustomToast from "../../hooks/useCustomToast"

const CycleTab: React.FC = () => {
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

    const { RangePicker } = DatePicker
    const startDate = dayjs('2022-01-01')
    const endDate = dayjs('2022-01-15')

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
                            <Navbar type={"Ciclo"} />
                            <Spacer />
                            <Navbar type={"Disciplinas"} />
                            <Spacer />
                            <Navbar type={"Fases"} />
                        </Flex>
                        <Heading size='lg'>Seus Ciclos</Heading>
                        <Divider mt={2} />
                        <TableContainer>
                            <Table fontSize="lg" size={{ base: "sm", md: "md" }}>
                                <Thead>
                                    <Tr>
                                        <Th>Ciclo</Th>
                                        <Th>Disciplinas</Th>
                                        <Th>Tempo de Duração</Th>
                                        <Th>Fases</Th>
                                        <Th>Ações</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td verticalAlign="top" >Ciclo 1</Td>
                                        <Td verticalAlign="top" >Língua Portuguesa<br/>Lingua Espanhola<br/>Matemática<br/></Td>
                                        <Td>
                                            <RangePicker
                                                id="timeCicle"
                                                size="large"                                                
                                                format="DD/MM/YYYY"
                                                placeholder={['Início do Ciclo', 'Término do Ciclo']}
                                                value={[startDate, endDate]}
                                                
                                                />
                                        </Td>
                                        <Td>Fase 1<br />Fase 2<br /> Fase 3<br /></Td>
                                        <Td verticalAlign="top">
                                            Ações
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

export default CycleTab
