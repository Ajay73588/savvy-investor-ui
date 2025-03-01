const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required:true },
    date: { type: Date, default: Date.now },
    description: { type: String, required:true },
    category: { type: String },
});

module.exports = mongoose.model('Transaction', transactionSchema);