
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account_id: Number,
  transactions: [
    {
      date: Date,
      amount: Number,
      transaction_code: String,
      symbol: String,
      price: String,
      total: String,
    },
  ],
});

module.exports = mongoose.model('Transaction', transactionSchema);
