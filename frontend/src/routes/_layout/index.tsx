import { createFileRoute } from "@tanstack/react-router"
import { useQueryClient } from "react-query"
import {
  CircularProgress, 
  CircularProgressLabel,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
} from '@chakra-ui/react'

import type { UserOut } from "../../client"
import { MdCheckCircle, MdSettings } from "react-icons/md"

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
          <Heading fontSize="2xl">
            Olá, {currentUser?.full_name || currentUser?.email}! 👋🏼
          </Heading>
          <Text>Seja bem-vindo novamente e bons estudos!</Text>
        </Box>
        <Container maxW="full">
          <Tabs variant='enclosed'>
            <TabList>
              <Tab>Ciclos</Tab>
              <Tab>Objetivos</Tab>
              <Tab>Disciplinas</Tab>
              <Tab>Histórico de Concursos</Tab>
              <Tab>Métricas de Estudos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Ciclos</p>
              </TabPanel>
              <TabPanel>
                <p>Objetivos</p>
              </TabPanel>
              <TabPanel>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Disciplina</Th>
                      <Th>Fase</Th>
                      <Th>Progresso</Th>
                      <Th>Ciclo atual</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Língua Portuguesa</Td>
                      <Td>Fase 3</Td>
                      <Td>
                        80%
                        <Progress mt={1} hasStripe colorScheme='green' size='xs' value={80} />
                      </Td>
                      <Td>Ciclo 1</Td>
                    </Tr>
                    <Tr>
                      <Td>Língua Inglesa</Td>
                      <Td>Fase 3</Td>
                      <Td>
                        60%
                        <Progress mt={1} hasStripe colorScheme='green' size='xs' value={60} />
                      </Td>
                      <Td>Ciclo 1</Td>
                    </Tr>
                    <Tr>
                      <Td>Língua Francesa </Td>
                      <Td>Fase 3</Td>
                      <Td>
                        40%
                        <Progress mt={1} hasStripe colorScheme='green' size='xs' value={40} />
                      </Td>
                      <Td>Ciclo 1</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    Concurso A - 2023: 
                    <CircularProgress ml={1} value={65} color='green.400'>
                      <CircularProgressLabel>65%</CircularProgressLabel>
                    </CircularProgress>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    Concurso B - 2023:
                    <CircularProgress ml={1} value={72} color='green.400'>
                      <CircularProgressLabel>72%</CircularProgressLabel>
                    </CircularProgress>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    Concurso C - 2024:
                    <CircularProgress ml={1} value={78} color='green.400'>
                      <CircularProgressLabel>78%</CircularProgressLabel>
                    </CircularProgress>
                  </ListItem>
                </List>
              </TabPanel>
              <TabPanel>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Lingua Inglesa
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Fase 1</Th>
                          </Tr>
                          <Tr>
                            <Th>Início </Th>
                            <Th>Conclusão</Th>
                            <Th>Questões Resolvidas</Th>
                            <Th>Questões Acertadas</Th>
                            <Th>Porcentagem</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>01/01/2024</Td>
                            <Td>30/01/2024</Td>
                            <Td>20</Td>
                            <Td>10</Td>
                            <Td>
                              50%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={50} />
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>Língua Inglesa</Td>
                            <Td>Fase 3</Td>
                            <Td>
                              60%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={60} />
                            </Td>
                            <Td>Ciclo 1</Td>
                          </Tr>
                          <Tr>
                            <Td>Língua Francesa </Td>
                            <Td>Fase 3</Td>
                            <Td>
                              40%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={40} />
                            </Td>
                            <Td>Ciclo 1</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          Lingua Portuguesa
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Disciplina</Th>
                            <Th>Fase</Th>
                            <Th>Progresso</Th>
                            <Th>Ciclo atual</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>Língua Portuguesa</Td>
                            <Td>Fase 3</Td>
                            <Td>
                              80%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={80} />
                            </Td>
                            <Td>Ciclo 1</Td>
                          </Tr>
                          <Tr>
                            <Td>Língua Inglesa</Td>
                            <Td>Fase 3</Td>
                            <Td>
                              60%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={60} />
                            </Td>
                            <Td>Ciclo 1</Td>
                          </Tr>
                          <Tr>
                            <Td>Língua Francesa </Td>
                            <Td>Fase 3</Td>
                            <Td>
                              40%
                              <Progress mt={1} hasStripe colorScheme='green' size='xs' value={40} />
                            </Td>
                            <Td>Ciclo 1</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Container>
      </Container>
    </>
  )
}

export default Dashboard
