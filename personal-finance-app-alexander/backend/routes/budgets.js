const express = require('express');
const router = express.Router();
// const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// // GET all transactions (protected)
// router.get('/', auth, transactionController.getAllTransactions);

// // POST a new transaction (protected)
// router.post('/', auth, transactionController.addTransaction);

// router.delete('/:id', auth, transactionController.deleteTransaction);





module.exports = router;