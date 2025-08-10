import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Flex,
  Spacer,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, DownloadIcon } from '@chakra-ui/icons';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import DashCharts from './components/DashCharts';   // ← AJOUT
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

export default function App() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.error("❌ Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleNewTransaction = () => {
    fetchTransactions();
  };

  const exportCSV = () => {
    const csvHeader = "ID,Amount,Currency,Country,PSP,Status,LatencyMs,CreatedAt\n";
    const csvRows = transactions
      .map((tx) =>
        `${tx.id},${tx.montant},${tx.devise},${tx.pays},${tx.psp},${tx.status},${tx.latency_ms ?? ""},${tx.created_at}`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // === KPIs Dashboard logic ===
  const totalAmount = transactions.reduce((acc, tx) => acc + (Number(tx.montant) || 0), 0);
  const count = transactions.length;
  const successCount = transactions.filter(tx => tx.status === "success").length;
  const failCount = count - successCount;

  const boxBg = useColorModeValue("white", "gray.700");
  const borderCol = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');

  return (
    <Box maxW="6xl" mx="auto" px={6} py={6}>
      <Flex mb={6} align="center">
        <Heading size="lg" fontWeight="extrabold">
          SwitchPay.{'\u00A0'}
          <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text">
            Your Money Matters.
          </Box>
        </Heading>
        <Spacer />
        <Button
          onClick={toggleColorMode}
          leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        >
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Flex>

      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList mb={4}>
          <Tab>New Transaction</Tab>
          <Tab>Transaction History</Tab>
          <Tab>Dashboard</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <MotionBox initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} maxW="md" mx="auto">
              <TransactionForm onNewTransaction={handleNewTransaction} />
            </MotionBox>
          </TabPanel>

          <TabPanel>
            <Flex justify="flex-end" mb={3}>
              <Button colorScheme="blue" onClick={exportCSV} leftIcon={<DownloadIcon />}>
                Download CSV
              </Button>
            </Flex>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <TransactionTable transactions={transactions} />
            </MotionBox>
          </TabPanel>

          <TabPanel>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={6}>
                <Stat bg={boxBg} p={6} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
                  <StatLabel>Total Volume</StatLabel>
                  <StatNumber>{totalAmount.toFixed(2)} €</StatNumber>
                </Stat>
                <Stat bg={boxBg} p={6} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
                  <StatLabel># Transactions</StatLabel>
                  <StatNumber>{count}</StatNumber>
                </Stat>
                <Stat bg={boxBg} p={6} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
                  <StatLabel>Success Rate</StatLabel>
                  <StatNumber>{count > 0 ? Math.round((successCount / count) * 100) : 0}%</StatNumber>
                </Stat>
                <Stat bg={boxBg} p={6} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
                  <StatLabel>Success</StatLabel>
                  <StatNumber>{successCount}</StatNumber>
                </Stat>
                <Stat bg={boxBg} p={6} borderRadius="md" shadow="md" border="1px solid" borderColor={borderCol}>
                  <StatLabel>Failed</StatLabel>
                  <StatNumber>{failCount}</StatNumber>
                </Stat>
              </SimpleGrid>

              {/* === Graphs avancés === */}
              <Box mt={8}>
                <DashCharts transactions={transactions} />
              </Box>
            </MotionBox>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box mt={16} pt={6} borderTop="1px solid" borderColor={borderCol} textAlign="center">
        <Button variant="link" onClick={() => navigate('/')}>
          ← Back to landing
        </Button>
      </Box>

      <ToastContainer position="bottom-right" />
    </Box>
  );
}
