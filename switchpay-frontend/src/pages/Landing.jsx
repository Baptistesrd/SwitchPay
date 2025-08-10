// src/pages/Landing.jsx (VERSION FINALE)
import React, { useEffect, useState } from 'react';
import {
  Box, Container, Flex, HStack, VStack, Stack, Spacer, Button, IconButton,
  Heading, Text, Badge, SimpleGrid, Stat, StatLabel, StatNumber, useColorMode,
  useColorModeValue, Link as ChakraLink, Divider, Tag, TagLeftIcon, TagLabel
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, LockIcon, CheckCircleIcon, TimeIcon, ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedParticles from '../components/AnimatedParticles';
import GlowBlob from '../components/GlowBlob';
import TrustLogos from '../components/TrustLogos';

const MotionBox = motion(Box);

const Section = ({ children, id, ...props }) => (
  <Box as="section" id={id} py={{ base: 16, md: 24 }} position="relative" {...props}>
    <Container maxW="6xl" position="relative" zIndex={1}>{children}</Container>
  </Box>
);

const BrandButton = ({ children, ...props }) => (
  <Button
    size="lg"
    px={8}
    borderRadius="full"
    bgGradient="linear(to-r, brand.500, brand.300)"
    color="white"
    _hover={{ filter: 'brightness(1.05)' }}
    {...props}
  >
    {children}
  </Button>
);

export default function Landing() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const subText = useColorModeValue('gray.600', 'gray.300');
  const heroBg = useColorModeValue(
    'linear(to-b, white, #eaf2ff)',
    'linear(to-b, gray.900, #0b1220)'
  );

  // Live metrics from backend
  const [metrics, setMetrics] = useState({ total_transactions: 0, total_volume: 0, transactions_by_psp: {} });
  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/metrics`);
      setMetrics(res.data);
    } catch (e) { /* silent fail on landing */ }
  };
  useEffect(() => {
    fetchMetrics();
    const id = setInterval(fetchMetrics, 8000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (hash) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box position="relative" overflow="hidden">
      {/* NAVBAR */}
      <Box
        position="sticky" top="0" zIndex="100"
        bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(17,24,39,0.6)')}
        backdropFilter="saturate(180%) blur(8px)"
        borderBottom="1px solid"
        borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
      >
        <Container maxW="6xl">
          <Flex h={16} align="center">
            <HStack spacing={3}>
              <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)"></Box>
              <Heading size="md">SwitchPay</Heading>
              <Tag size="sm" variant="subtle" colorScheme="purple" ml={2}>
                <TagLeftIcon as={StarIcon}/>
                <TagLabel>Fintech Infra</TagLabel>
              </Tag>
            </HStack>
            <Spacer />
            <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
              <ChakraLink as="button" onClick={() => scrollTo('#how')}>How it works</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo('#why')}>Why SwitchPay</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo('#metrics')}>Live Metrics</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo('#security')}>Security</ChakraLink>
            </HStack>
            <HStack spacing={3} ml={4}>
              <IconButton aria-label="toggle color mode" onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} />
              <BrandButton onClick={() => navigate('/app')}>Make a transaction</BrandButton>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* HERO */}
      <Box as="header" bgGradient={heroBg} position="relative">
        {/* Background FX */}
        <Box position="absolute" inset={0} zIndex={0}>
          <AnimatedParticles />
          <GlowBlob top="5%" left="65%" size="520px" delay={0.2}/>
          <GlowBlob top="55%" left="10%" size="460px" delay={0.6}/>
        </Box>

        <Section id="hero" py={{ base: 20, md: 28 }}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={10} align="center">
            <VStack align="start" spacing={6} maxW="xl">
              <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>Smart Payment Routing</Badge>
              <Heading as="h1" size="2xl" lineHeight="1.1">
                Welcome to SwitchPay.<br />
                <Box as="span" bgGradient="linear(to-r, brand.500, brand.300)" bgClip="text" className="shimmer">
                  Your money matters.
                </Box>
              </Heading>
              <Text fontSize="lg" color={subText}>
                Automatically route each payment to the best PSP (Stripe, Adyen, Wise, Rapyd) based on country, currency, fees, and device. More conversions. Lower costs.
              </Text>
              <HStack spacing={4}>
                <BrandButton onClick={() => navigate('/app')}>Get started</BrandButton>
                <Button variant="ghost" rightIcon={<ExternalLinkIcon />} onClick={() => scrollTo('#how')}>
                  See how it works
                </Button>
              </HStack>
              <HStack spacing={6} pt={2}>
                <HStack spacing={2}>
                  <CheckCircleIcon color="green.400" />
                  <Text color={subText}>95%+ success (simulated)</Text>
                </HStack>
                <HStack spacing={2}>
                  <TimeIcon color="blue.400" />
                  <Text color={subText}>Latency-aware routing</Text>
                </HStack>
              </HStack>

              {/* Logos PSP (social proof) */}
              <TrustLogos />
            </VStack>

            <MotionBox
              flex="1"
              bg={cardBg}
              border="1px solid"
              borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
              borderRadius="2xl"
              p={6}
              shadow="xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack align="stretch" spacing={5}>
                <Heading size="md">What SwitchPay optimizes</Heading>
                <SimpleGrid columns={2} spacing={3}>
                  <Feature label="Higher auth rates" />
                  <Feature label="Lower fees" />
                  <Feature label="Geo coverage" />
                  <Feature label="Failover routing" />
                </SimpleGrid>
                <Divider />
                <MiniKpis metrics={metrics} />
                <Text fontSize="sm" color={subText}>
                  Local demo: connected to your FastAPI backend (endpoints <code>/transaction</code> & <code>/metrics</code>).
                </Text>
              </VStack>
            </MotionBox>
          </Stack>
        </Section>
      </Box>

      {/* HOW IT WORKS */}
      <Section id="how">
        <VStack align="start" spacing={8}>
          <Heading size="xl">How it works</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Step number="1" title="Collect" desc="Front envoie (montant, devise, pays, device) avec API Key." />
            <Step number="2" title="Route" desc="Smart router choisit le PSP optimal (Stripe/Adyen/Wise/Rapyd…)." />
            <Step number="3" title="Settle" desc="Paiement traité, stocké en base, KPIs mis à jour." />
          </SimpleGrid>
        </VStack>
      </Section>

      {/* WHY SWITCHPAY */}
      <Section id="why" bg={useColorModeValue('gray.50', 'gray.850')}>
        <VStack align="start" spacing={8}>
          <Heading size="xl">Why SwitchPay</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <ValueCard title="Plug & Play" text="Backend FastAPI + front React prêts pour l’itération." />
            <ValueCard title="Idempotency by design" text="Protection contre les retries — même clé = même réponse." />
            <ValueCard title="Observability" text="KPIs, volumes & distribution par PSP via /metrics." />
          </SimpleGrid>
        </VStack>
      </Section>

      {/* LIVE METRICS */}
      <Section id="metrics">
        <VStack align="start" spacing={6}>
          <Heading size="xl">Live Metrics</Heading>
          <Text color={subText}>Real data from your local instance via <code>/metrics</code>.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={4}>
            <Stat bg={cardBg} p={6} borderRadius="lg" shadow="md">
              <StatLabel>Total Volume</StatLabel>
              <StatNumber>{metrics.total_volume?.toFixed(2) ?? 0} €</StatNumber>
            </Stat>
            <Stat bg={cardBg} p={6} borderRadius="lg" shadow="md">
              <StatLabel># Transactions</StatLabel>
              <StatNumber>{metrics.total_transactions ?? 0}</StatNumber>
            </Stat>
            <Stat bg={cardBg} p={6} borderRadius="lg" shadow="md">
              <StatLabel>By PSP</StatLabel>
              <StatNumber fontSize="lg">
                {Object.entries(metrics.transactions_by_psp || {}).map(([k, v]) => (
                  <Badge key={k} mr={2} colorScheme="blue" variant="subtle">{k}:{v}</Badge>
                ))}
              </StatNumber>
            </Stat>
          </SimpleGrid>
        </VStack>
      </Section>

      {/* SECURITY */}
      <Section id="security" bg={useColorModeValue('gray.50', 'gray.850')}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <VStack align="start" spacing={6}>
            <Heading size="xl">Security & Reliability</Heading>
            <Text color={subText}>
              API Keys via <code>.env</code>, stored idempotency, controlled CORS.
              Replace simulated PSPs with real calls (Stripe/Adyen SDK) when you’re ready.
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="green" px={3} py={1} borderRadius="full"><LockIcon mr={1}/> API Key</Badge>
              <Badge colorScheme="purple" px={3} py={1} borderRadius="full">Idempotency</Badge>
              <Badge colorScheme="blue" px={3} py={1} borderRadius="full">Metrics</Badge>
            </HStack>
          </VStack>
          <MotionBox
            bg={cardBg}
            borderRadius="2xl"
            border="1px solid"
            borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
            p={8}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Next steps</Heading>
              <RoadmapItem text="Connect Stripe (PaymentIntent) sandbox." />
              <RoadmapItem text="Add retry & failover (PSP fallback) in backend." />
              <RoadmapItem text="Routing score = cost + latency + auth rate + region." />
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Section>

      {/* CTA */}
      <Section id="cta" py={{ base: 12, md: 16 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          bg={useColorModeValue('white', 'gray.800')}
          border="1px solid"
          borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
          borderRadius="2xl"
          p={{ base: 8, md: 12 }}
          shadow="xl"
        >
          <VStack align="start" spacing={3}>
            <Heading size="lg">Start routing smarter, today.</Heading>
            <Text color={subText}>Jump into the app and create your first transaction.</Text>
          </VStack>
          <Spacer />
          <BrandButton onClick={() => navigate('/app')}>Make a transaction</BrandButton>
        </Flex>
      </Section>

      {/* FOOTER */}
      <Box
        as="footer"
        py={10}
        borderTop="1px solid"
        borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
        bgGradient={useColorModeValue('linear(to-r, #f7fafc, #edf2f7)', 'linear(to-r, gray.900, gray.800)')}
      >
        <Container maxW="6xl">
          <Flex align="center">
            <HStack spacing={3}>
              <Box w="10px" h="10px" borderRadius="full" bgGradient="linear(to-br, brand.400, brand.600)" />
              <Text>© {new Date().getFullYear()} SwitchPay</Text>
            </HStack>
            <Spacer />
            <HStack spacing={6}>
              <ChakraLink as={RouterLink} to="/app">Product app</ChakraLink>
              <ChakraLink as="button" onClick={() => scrollTo('#security')}>Security</ChakraLink>
              <ChakraLink href="mailto:hello@switchpay.local">Contact</ChakraLink>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

function Feature({ label }) {
  const chipBg = useColorModeValue('gray.100', 'whiteAlpha.200');
  return (
    <Box px={3} py={2} bg={chipBg} borderRadius="full" textAlign="center" fontWeight="medium">
      {label}
    </Box>
  );
}

function Step({ number, title, desc }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  return (
    <MotionBox
      bg={cardBg}
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
      shadow="md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Badge colorScheme="blue" borderRadius="full" mb={3}>Step {number}</Badge>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{desc}</Text>
    </MotionBox>
  );
}

function ValueCard({ title, text }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  return (
    <MotionBox
      bg={cardBg}
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
      shadow="md"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>
    </MotionBox>
  );
}

function RoadmapItem({ text }) {
  return (
    <HStack align="start" spacing={3}>
      <CheckCircleIcon color="green.400" mt="2px" />
      <Text>{text}</Text>
    </HStack>
  );
}

function MiniKpis({ metrics }) {
  return (
    <SimpleGrid columns={3} spacing={3}>
      <Kpi label="Volume" value={`${(metrics.total_volume ?? 0).toFixed(0)}€`} />
      <Kpi label="Tx" value={metrics.total_transactions ?? 0} />
      <Kpi label="PSPs" value={Object.keys(metrics.transactions_by_psp || {}).length} />
    </SimpleGrid>
  );
}

function Kpi({ label, value }) {
  return (
    <Box p={3} borderRadius="lg" bg={useColorModeValue('gray.50','whiteAlpha.100')} textAlign="center">
      <Text fontSize="xs" opacity={0.7}>{label}</Text>
      <Heading size="md">{value}</Heading>
    </Box>
  );
}
