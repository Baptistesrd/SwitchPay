export default function TransactionTable({ transactions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Montant</th>
          <th>Devise</th>
          <th>Pays</th>
          <th>PSP</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.id.slice(0, 6)}...</td>
            <td>{tx.montant}</td>
            <td>{tx.devise}</td>
            <td>{tx.pays}</td>
            <td>{tx.psp}</td>
            <td>{tx.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
