const { customers, accounts } = require('../models/dataStore'); 

// GET /api/accounts - get all accounts
const getAllAccounts = (req, res) => {
    res.status(200).json(accounts);
};


// GET /api/accounts/:id - get single account by id
const getAccountById = (req, res) => {
    const id = parseInt(req.params.id);
    const account = accounts.find(a => a.id === id);

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);

};


// GET /api/accounts/search?name=John - get accounts by customer name
const getAccountByName = (req, res) => {
    const name = req.query.name.toLowerCase();
    const matchedCustomers = customers.filter(c => c.name.toLowerCase().includes(name));
    const matchedIds = matchedCustomers.map(c => c.id);
    const result = accounts.filter(a => matchedIds.includes(a.customerId));

    res.status(200).json(result);
};


// POST /api/accounts - create new account
const createAccount = (req, res) => {
    const { accountNumber, accountType, balance, customerId } = req.body;
    const customer = customers.find(c => c.id === customerId);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    const newAccount = {
        id: accounts.length + 1,
        accountNumber,
        accountType,
        balance,
        customerId
    };

    accounts.push(newAccount);
    res.status(201).json(newAccount);
};

// PUT /api/accounts/:id - update account
const updateAccount = (req, res) => {
    const id = parseInt(req.params.id);
    const account = accounts.find(a => a.id === id);

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    const { accountType, balance } = req.body;
    account.accountType = accountType || account.accountType;
    account.balance = balance !== undefined ? balance : account.balance;

    res.status(200).json(account);
};

// DELETE /api/accounts/:id - delete account
const deleteAccount = (req, res) => {
    const id = parseInt(req.params.id);
    const index = accounts.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Account not found" });
    }

    accounts.splice(index, 1);
    res.status(200).json({ message: "Account deleted" });
};

module.exports = {
    getAllAccounts,
    getAccountById,
    getAccountByName,
    createAccount,
    updateAccount,
    deleteAccount
};