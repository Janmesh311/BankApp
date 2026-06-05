const Customer = require('../models/CustomerModel');  // mongoose model
const Account = require('../models/AccountModel');    // mongoose model

// GET /api/customers - get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();      // gets all from MongoDB
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/customers/:id - get single customer
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/customers/search?name=John
const getCustomerByName = async (req, res) => {
    try {
        const name = req.query.name;
        const customers = await Customer.find({ name: { $regex: name, $options: 'i' } });  // case insensitive search
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/customers/premium - balance over $10,000
const getPremiumCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        const premium = [];

        for (const customer of customers) {
            const accounts = await Account.find({ customerId: customer._id });
            const total = accounts.reduce((sum, a) => sum + a.balance, 0);
            if (total > 10000) premium.push(customer);
        }

        res.status(200).json(premium);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/customers - create customer
const createCustomer = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newCustomer = new Customer({ name, email });
        await newCustomer.save();                     // saves to MongoDB
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/customers/:id - update customer
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }                            // returns updated document
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/customers/:id - delete customer and their accounts
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        await Account.deleteMany({ customerId: req.params.id });  // delete their accounts too
        res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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