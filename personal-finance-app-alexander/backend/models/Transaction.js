const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Add this line (use user ID or username)
  recipient: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Transaction', TransactionSchema);