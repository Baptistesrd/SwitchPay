import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/transactions');
      setTransactions(res.data);
      console.log("📦 Transactions chargées :", res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des transactions :", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleNewTransaction = () => {
    fetchTransactions(); // Refresh list
  };

  return (
    <div>
      <h1>💸 SwitchPay</h1>
      <TransactionForm onNewTransaction={handleNewTransaction} />
      <TransactionTable transactions={transactions} />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
