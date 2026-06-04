import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3000";

function App() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // fetch all customers when page loads
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get(`${API}/api/customers`);
    setCustomers(res.data);
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
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Bank App</h1>

      {/* Create Customer Form */}
      <h2>Add Customer</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={createCustomer}>Add</button>

      {/* Customer List */}
      <h2>Customers</h2>
      {customers.map((c) => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><b>Name:</b> {c.name}</p>
          <p><b>Email:</b> {c.email}</p>
          <button onClick={() => deleteCustomer(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;