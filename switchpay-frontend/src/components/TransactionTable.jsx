import React from 'react';
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
  Button,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

// Composant pour simuler un webhook et mettre à jour le statut de la transaction
function SimulateWebhookButton({ transactionId }) {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const simulateWebhook = async () => {
    setLoading(true);
    const status = Math.random() > 0.5 ? 'success' : 'failed'; // Statut aléatoire

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/webhook/stripe`, {
        tx_id: transactionId,
        status: status
      });
      toast({
        title: `Transaction ${status}`,
        description: `Transaction ${transactionId} status updated to ${status}.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'There was an error simulating the webhook.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      colorScheme="blue"
      onClick={simulateWebhook}
      isLoading={loading}
      loadingText="Updating"
    >
      Simulate Webhook
    </Button>
  );
}

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
                <Th>Actions</Th> {/* Nouvelle colonne pour le bouton */}
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
                  <Td>
                    <SimulateWebhookButton transactionId={tx.id} /> {/* Intégration du bouton */}
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


