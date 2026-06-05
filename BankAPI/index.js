require('dotenv').config();                          
const express = require('express');                  
const connectDB = require('./config/db');             

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

connectDB();                                         

app.use(express.json());                             

// load controllers
const customerController = require('./controllers/customerController');
const accountController = require('./controllers/accountController');

// customer routes
app.get('/api/customers/premium', customerController.getPremiumCustomers);
app.get('/api/customers/search', customerController.getCustomerByName);
app.get('/api/customers', customerController.getAllCustomers);
app.get('/api/customers/:id', customerController.getCustomerById);
app.post('/api/customers', customerController.createCustomer);
app.put('/api/customers/:id', customerController.updateCustomer);
app.delete('/api/customers/:id', customerController.deleteCustomer);

// account routes
app.get('/api/accounts/search', accountController.getAccountByName);
app.get('/api/accounts', accountController.getAllAccounts);
app.get('/api/accounts/:id', accountController.getAccountById);
app.post('/api/accounts', accountController.createAccount);
app.put('/api/accounts/:id', accountController.updateAccount);
app.delete('/api/accounts/:id', accountController.deleteAccount);

// test route
app.get('/', (req, res) => {
    res.send('Bank API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});