
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');


router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find({ active: true });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/transactions/:accountId', async (req, res) => {
  try {
    const transactions = await Transaction.findOne({ account_id: req.params.accountId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//You Can Used This Also 
// Query for accounts with transactions below a certain amount 
router.get('/accounts/transactions-below/:amount', async (req, res) => {
  try {
    const accounts = await Transaction.aggregate([
      { $unwind: "$transactions" },
      { $match: { "transactions.amount": { $lt: parseInt(req.params.amount) } } },
      { $group: { _id: "$account_id" } }
    ]);
    res.json(accounts.map(acc => acc._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Query for distinct products
router.get('/products', async (req, res) => {
  try {
    const products = await Account.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products" } }
    ]);
    res.json(products.map(prod => prod._id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
