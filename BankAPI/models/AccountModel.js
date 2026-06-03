const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    accountType: { type: String, enum: ['Savings', 'Checking'], required: true },
    balance: { type: Number, default: 0 },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }
});

module.exports = mongoose.model('Account', accountSchema);