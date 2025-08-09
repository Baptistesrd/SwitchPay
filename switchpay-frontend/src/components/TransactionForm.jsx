import React, { useState, useEffect } from 'react';
import {
  VStack, Input, Select, Button, useToast, Heading
} from '@chakra-ui/react';
import axios from 'axios';

export default function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({
    montant: '',
    devise: '',
    pays: '',
    device: '',
  });

  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || '');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      montant: parseFloat(formData.montant),
      devise: formData.devise,
      pays: formData.pays,
      device: formData.device,
    };

    // Idempotency-Key par requête
    const idempotencyKey = (window.crypto && window.crypto.randomUUID)
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction`, payload, {
        headers: {
          'x-api-key': apiKey,
          'Idempotency-Key': idempotencyKey,
        },
      });

      toast({
        title: "✅ Transaction sent",
        description: "Your transaction was successfully submitted.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      onNewTransaction();
      setFormData({ montant: '', devise: '', pays: '', device: '' });
    } catch (err) {
      console.error("❌ API Error:", err);
      toast({
        title: "❌ Error",
        description: err.response?.data?.detail || "Transaction failed.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch" maxW="md" mx="auto" mt={10}>
        <Heading size="md" textAlign="center">New Transaction</Heading>

        <Input
          name="apiKey"
          type="password"
          placeholder="Your API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <Input
          name="montant"
          type="number"
          placeholder="Amount"
          value={formData.montant}
          onChange={handleChange}
          required
        />

        <Select
          name="devise"
          placeholder="Select currency"
          value={formData.devise}
          onChange={handleChange}
          required
        >
          <option value="EUR">🇪🇺 EUR – Euro</option>
          <option value="USD">🇺🇸 USD – US Dollar</option>
          <option value="GBP">🇬🇧 GBP – British Pound</option>
          <option value="JPY">🇯🇵 JPY – Japanese Yen</option>
          <option value="CHF">🇨🇭 CHF – Swiss Franc</option>
          <option value="CAD">🇨🇦 CAD – Canadian Dollar</option>
          <option value="AUD">🇦🇺 AUD – Australian Dollar</option>
          <option value="CNY">🇨🇳 CNY – Chinese Yuan</option>
          <option value="INR">🇮🇳 INR – Indian Rupee</option>
          <option value="BRL">🇧🇷 BRL – Brazilian Real</option>
          <option value="ZAR">🇿🇦 ZAR – South African Rand</option>
          <option value="SGD">🇸🇬 SGD – Singapore Dollar</option>
          <option value="MXN">🇲🇽 MXN – Mexican Peso</option>
          <option value="TRY">🇹🇷 TRY – Turkish Lira</option>
        </Select>

        <Input
          name="pays"
          placeholder="Country (ex: FR)"
          value={formData.pays}
          onChange={handleChange}
          required
        />

        <Select
          name="device"
          placeholder="Select device"
          value={formData.device}
          onChange={handleChange}
          required
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </Select>

        <Button colorScheme="blue" type="submit" isLoading={loading}>
          Send
        </Button>
      </VStack>
    </form>
  );
}


