import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

export default function TransactionTable({ transactions }) {
  return (
    <Box mt={10}>
      <Heading size="lg" textAlign="center" fontWeight="semibold" fontFamily="'DM Sans', sans-serif">
        💸 Transaction History
      </Heading>

      {transactions.length === 0 ? (
        <Text textAlign="center" mt={4} color="gray.500" fontStyle="italic">
          No transactions yet. Send your first transaction to get started.
        </Text>
      ) : (
        <TableContainer mt={6} overflowX="auto" borderRadius="xl" boxShadow="md">
          <Table variant="simple" size="md">
            <Thead bg="gray.50">
              <Tr>
                <Th>ID</Th>
                <Th>Amount</Th>
                <Th>Currency</Th>
                <Th>Country</Th>
                <Th>PSP</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td>{tx.id.slice(0, 6)}...</Td>
                  <Td fontWeight="medium">{tx.montant}</Td>
                  <Td>{tx.devise}</Td>
                  <Td>{tx.pays}</Td>
                  <Td fontStyle="italic" color="gray.600">{tx.psp}</Td>
                  <Td>
                    <Badge
                      colorScheme={tx.status === "success" ? "green" : "red"}
                      variant="subtle"
                      borderRadius="md"
                      px={2}
                      py={1}
                      textTransform="capitalize"
                    >
                      {tx.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}


