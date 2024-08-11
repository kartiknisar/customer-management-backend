const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mileexp-test-db')
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message +"errrro");
    process.exit(1);
  }
};
module.exports = connectDB;

