import {
    Container,
    Divider,
    Flex,
    Heading,
    Spacer,
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

const SubjectTab: React.FC = () => {
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
            <Container maxW="full">
                <Flex direction="row">
                    <Navbar type={"Disciplina"} />
                    <Spacer/>
                    <Navbar type={"Conteúdo"} />
                </Flex>
                
                <Heading size='lg' >Suas Disciplinas</Heading>
                <Divider mt={2} />

                <TableContainer>
                    <Table fontSize="lg" size={{ base: "sm", md: "md" }}>
                        <Thead>
                            <Tr>
                                <Th>Objetivo</Th>
                                <Th>Disciplina</Th>
                                <Th>Conteúdo</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td verticalAlign="top" >Concurso da Caixa</Td>
                                <Td verticalAlign="top" >Língua Portuguesa</Td>
                                <Td>
                                    1 Compreensão e interpretação de textos de gêneros variados.<br />
                                    2 Reconhecimento de tipos e gêneros textuais.<br />
                                    3 Domínio da ortografia oficial.<br />
                                    4 Domínio dos mecanismos de coesão textual.<br />
                                    4.1 Emprego de elementos de referenciação, substituição e repetição, de conectores e de outros<br />
                                    elementos de sequenciação textual."<br />
                                    4.2 Emprego de tempos e modos verbais.<br />
                                    5 Domínio da estrutura morfossintática do período.<br />
                                    5.1 Emprego das classes de palavras.<br />
                                    5.2 Relações de coordenação entre orações e entre termos da oração.<br />
                                    5.3 Relações de subordinação entre orações e entre termos da oração.<br />
                                    5.4 Emprego dos sinais de pontuação.<br />
                                    5.5 Concordância verbal e nominal.<br />
                                    5.6 Regência verbal e nominal.<br />
                                    5.7 Emprego do sinal indicativo de crase.<br />
                                    5.8 Colocação dos pronomes átonos.<br />
                                    6 Reescrita de frases e parágrafos do texto.<br />
                                    6.1 Significação das palavras.<br />
                                    6.2 Substituição de palavras ou de trechos de texto.<br />
                                    6.3 Reorganização da estrutura de orações e de períodos do texto.<br />
                                    6.4 Reescrita de textos de diferentes gêneros e níveis de formalidade.<br />
                                    7 Correspondência oficial (conforme Manual de Redação da Presidência da República).<br />
                                    7.1 Aspectos gerais da redação oficial.<br />
                                    7.2 Finalidade dos expedientes oficiais.<br />
                                    7.3 Adequação da linguagem ao tipo de documento.<br />
                                    7.4 Adequação do formato do texto ao gênero.<br />
                                </Td>
                                <Td verticalAlign="top">
                                    Ações
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Container>


        </>
    )
}

export default SubjectTab