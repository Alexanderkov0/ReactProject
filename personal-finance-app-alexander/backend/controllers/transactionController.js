const Transaction = require('../models/Transaction');

// GET /api/transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipient, category, date, amount } = req.body;
    const transaction = new Transaction({ user: userId, recipient, category, date, amount });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    // Only allow deleting user's own transaction
    const deleted = await Transaction.findOneAndDelete({ _id: id, user: userId });
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};