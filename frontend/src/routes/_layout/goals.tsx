import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react"

import { createFileRoute } from "@tanstack/react-router"
import ObjetivoTab from "../../components/Goals/ObjetivoTab"
import SubjectTab from "../../components/Goals/SubjectTab"
import CycleTab from "../../components/Goals/CycleTab"
import QuestionsTab from "../../components/Goals/PerformanceQuestionsTab"
import HistoryTab from "../../components/Goals/HistoryTab"

export const Route = createFileRoute("/_layout/goals")({
    component: Goal,
})

function Goal() {

    return (
        <>
            <Tabs variant='enclosed' size='lg' mt={15} height="100vh" width="full">
                <TabList>
                    <Tab>Objetivos</Tab>
                    <Tab>Disciplinas e Conteúdos</Tab>                    
                    <Tab>Ciclos</Tab>
                    <Tab>Desempenho em Questões</Tab>
                    <Tab>Histórico de Desempenho</Tab>
                </TabList>
                <TabPanels >
                    <TabPanel>
                        <ObjetivoTab />
                    </TabPanel>
                    <TabPanel>
                        <SubjectTab />
                    </TabPanel>
                    <TabPanel>
                        <CycleTab />
                    </TabPanel>
                    <TabPanel>
                        <QuestionsTab />
                    </TabPanel>
                    <TabPanel>
                        <HistoryTab />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </>
    )
}

export default Goal