const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },       // name is required
    email: { type: String, required: true },      // email is required
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]  // links to accounts
});

module.exports = mongoose.model('Customer', customerSchema);