
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: String,
  name: String,
  address: String,
  email: String,
  active: Boolean,
  accounts: [Number],
});

module.exports = mongoose.model('Customer', customerSchema);
