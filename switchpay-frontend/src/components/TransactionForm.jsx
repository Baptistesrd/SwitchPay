import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function TransactionForm({ onNewTransaction }) {
  const [formData, setFormData] = useState({
    montant: '',
    devise: '',
    pays: '',
    device: '',
  });

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

    console.log("✅ Form submitted:", payload);

    try {
      const res = await axios.post('http://127.0.0.1:8000/transaction', payload, {
        headers: { 'x-api-key': 'cle-api-entreprise1' }, // OK
      });
      toast.success("✅ Transaction envoyée !");
      onNewTransaction(res.data);
    } catch (err) {
      console.error("❌ Erreur API :", err);
      toast.error("❌ Échec de la transaction !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="montant" placeholder="Montant" onChange={handleChange} required />
      <input name="devise" placeholder="Devise (ex: EUR)" onChange={handleChange} required />
      <input name="pays" placeholder="Pays (ex: FR)" onChange={handleChange} required />
      <input name="device" placeholder="Device (web, mobile...)" onChange={handleChange} required />
      <button type="submit">Envoyer</button>
    </form>
  );
}
