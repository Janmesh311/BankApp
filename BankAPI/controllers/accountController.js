const Account = require('../models/AccountModel');    // mongoose model
const Customer = require('../models/CustomerModel');  // mongoose model

// GET /api/accounts - get all accounts
const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();        // gets all from MongoDB
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/accounts/:id - get single account
const getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) return res.status(404).json({ message: "Account not found" });
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/accounts/search?name=John
const getAccountByName = async (req, res) => {
    try {
        const name = req.query.name;
        const customers = await Customer.find({ name: { $regex: name, $options: 'i' } });
        const customerIds = customers.map(c => c._id);
        const accounts = await Account.find({ customerId: { $in: customerIds } });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/accounts - create account
const createAccount = async (req, res) => {
    try {
        const { accountNumber, accountType, balance, customerId } = req.body;
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const newAccount = new Account({ accountNumber, accountType, balance, customerId });
        await newAccount.save();                      // saves to MongoDB
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /api/accounts/:id - update account
const updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }                            // returns updated document
        );
        if (!account) return res.status(404).json({ message: "Account not found" });
        res.status(200).json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/accounts/:id - delete account
const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) return res.status(404).json({ message: "Account not found" });
        res.status(200).json({ message: "Account deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAccounts,
    getAccountById,
    getAccountByName,
    createAccount,
    updateAccount,
    deleteAccount
};