const { customers, accounts } = require('../models/dataStore');

const getAllCustomers = (req, res) => {
    res.status(200).json(customers);
};

const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
};

const getCustomerByName = (req, res) => {
    const name = req.query.name.toLowerCase();
    const result = customers.filter(c => c.name.toLowerCase().includes(name));
    res.status(200).json(result);
};

const getPremiumCustomers = (req, res) => {
    const premium = customers.filter(customer => {
        const total = accounts
            .filter(a => a.customerId === customer.id)
            .reduce((sum, a) => sum + a.balance, 0);
        return total > 10000;
    });
    res.status(200).json(premium);
};

const createCustomer = (req, res) => {
    const { name, email } = req.body;
    const newCustomer = { id: customers.length + 1, name, email, accounts: [] };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
};

const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    const { name, email } = req.body;
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    res.status(200).json(customer);
};

const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Customer not found" });
    }

    const accountIndex = accounts.findIndex(a => a.customerId === id);
    if (accountIndex !== -1) accounts.splice(accountIndex, 1);

    customers.splice(index, 1);
    res.status(200).json({ message: "Customer deleted" });
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByName,
    getPremiumCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
};