import {
  Divider,
  Select,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Container,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useQueryClient } from "react-query"

import type { UserOut } from "../../client"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const queryClient = useQueryClient()

  const currentUser = queryClient.getQueryData<UserOut>("currentUser")

  const opcoesAluno = ['Maria da Silva', 'João de Souza', 'Joaquina de Assis'];

  const dadosTabela = [
    { disciplina: 'Língua Portuguesa', fase: 'Fase 2', questoesresolvidas: 20, porcentagemacerto: 70 },
    { disciplina: 'Língua Inglesa', fase: 'Fase 3', questoesresolvidas: 25, porcentagemacerto: 80 },
    { disciplina: 'Língua Francesa', fase: 'Fase 1', questoesresolvidas: 10, porcentagemacerto: 50 }
  ];

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Heading fontSize="2xl">
            Olá, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Heading>
          <Text>Seja bem-vindo novamente, professor!</Text>
        </Box>
        <Container maxW="full">
          <Tabs variant='enclosed'>
            <TabList>
              <Tab>Visão Geral</Tab>
              <Tab>Desempenho de Alunos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tabs variant='soft-rounded' colorScheme='green'>
                  <TabList>
                    <Tab>Disciplinas Básicas</Tab>
                    <Tab>Disciplinas Específicas</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
              <TabPanel>
                <Select mb={2} placeholder='Selecione o aluno'>
                  {opcoesAluno.map((aluno, index) => (
                    <option key={index} value={aluno}>{aluno}</option>
                  ))}
                </Select>
                <Divider orientation='horizontal' />
                <Tabs mt={2} variant='soft-rounded' colorScheme='green'>
                  <TabList>
                    <Tab>Ciclo 1</Tab>
                    <Tab>Ciclo 2</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Disciplina</Th>
                            <Th>Fase</Th>
                            <Th>Questões Resolvidas</Th>
                            <Th>Percentual de Acerto</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {dadosTabela.map((linha, index) => (
                            <Tr key={index}>
                              <Td>{linha.disciplina}</Td>
                              <Td>{linha.fase}</Td>
                              <Td>{linha.questoesresolvidas}</Td>
                              <Td>
                                <span style={{
                                  display: 'inline-block', 
                                  padding: '4px 10px', 
                                  borderRadius: '4px', 
                                  backgroundColor: linha.porcentagemacerto >= 70 ? '#5cb85c' : '#f0ad4e', 
                                  color: 'white' 
                                }}>
                                  {linha.porcentagemacerto}%
                                </span>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Container>
    </>
  )
}

export default Dashboard
