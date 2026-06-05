import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3000";

function App() {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // account form state
  const [accNumber, setAccNumber] = useState("");
  const [accType, setAccType] = useState("Savings");
  const [accBalance, setAccBalance] = useState("");
  const [accCustomerId, setAccCustomerId] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchAccounts();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get(`${API}/api/customers`);
    setCustomers(res.data);
  };

  const fetchAccounts = async () => {
    const res = await axios.get(`${API}/api/accounts`);
    setAccounts(res.data);
  };

  const createCustomer = async () => {
    await axios.post(`${API}/api/customers`, { name, email });
    setName("");
    setEmail("");
    fetchCustomers();
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`${API}/api/customers/${id}`);
    fetchCustomers();
    fetchAccounts();
  };

  const createAccount = async () => {
    await axios.post(`${API}/api/accounts`, {
      accountNumber: accNumber,
      accountType: accType,
      balance: parseFloat(accBalance),
      customerId: accCustomerId
    });
    setAccNumber("");
    setAccBalance("");
    setAccCustomerId("");
    fetchAccounts();
  };

  const deleteAccount = async (id) => {
    await axios.delete(`${API}/api/accounts/${id}`);
    fetchAccounts();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Bank App</h1>

      {/* Add Customer */}
      <h2>Add Customer</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ marginRight: "10px" }} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginRight: "10px" }} />
      <button onClick={createCustomer}>Add Customer</button>

      {/* Customer List */}
      <h2>Customers</h2>
      {customers.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <p><b>ID:</b> {c._id}</p>
          <button onClick={() => deleteCustomer(c._id)}>Delete</button>
        </div>
      ))}

      {/* Add Account */}
      <h2>Add Account</h2>
      <input placeholder="Account Number" value={accNumber} onChange={(e) => setAccNumber(e.target.value)} style={{ marginRight: "10px" }} />
      <select value={accType} onChange={(e) => setAccType(e.target.value)} style={{ marginRight: "10px" }}>
        <option value="Savings">Savings</option>
        <option value="Checking">Checking</option>
      </select>
      <input placeholder="Balance" value={accBalance} onChange={(e) => setAccBalance(e.target.value)} style={{ marginRight: "10px" }} />
      <input placeholder="Customer ID" value={accCustomerId} onChange={(e) => setAccCustomerId(e.target.value)} style={{ marginRight: "10px" }} />
      <button onClick={createAccount}>Add Account</button>

      {/* Account List */}
      <h2>Accounts</h2>
      {accounts.map((a) => (
        <div key={a._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><b>Account Number:</b> {a.accountNumber}</p>
          <p><b>Type:</b> {a.accountType}</p>
          <p><b>Balance:</b> ${a.balance}</p>
          <p><b>Customer ID:</b> {a.customerId}</p>
          <button onClick={() => deleteAccount(a._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;