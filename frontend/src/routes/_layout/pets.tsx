import {
  Box,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import { Pet } from "../../client/models/Pets"

import { useEffect, useState } from "react"

export const Route = createFileRoute("/_layout/pets")({
  component: ApiPets,
})

function ApiPets() {

  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetch('http://localhost/api/v1/pets/pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((resp: Response) => {
      if (!resp.ok) {
        throw new Error('Erro ao obter dados dos projetos');
      }
      return resp.json();
    })
    .then((data: any) => {
      setPets(data);
      console.log(data);
    })
    .catch((err: Error) => console.error(err));
  }, []);

  console.log(pets);

    return (
    <>
      <Container maxW="full">
          <Box maxW="full">
            <Heading
              size="lg"
              textAlign={{ base: "center", md: "left" }}
              pt={12} m={4}
            >
              Consumindo API
            </Heading>
            <TableContainer>
              <Table size={{ base: "sm", md: "md" }}>
                <Thead>
                  <Tr>
                    <Th>Pet ID</Th>
                    <Th>Nome</Th>
                    <Th>Status</Th>                     
                  </Tr>
                </Thead>
                <Tbody>
                {pets && pets.map((pet) => (
                    <Tr key={pet.id}>
                      <Td>{pet.id}</Td>
                      <Td>{pet.name}</Td>
                      <Td>{pet.status}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
      </Container>
    </>
  )
}

export default ApiPets
