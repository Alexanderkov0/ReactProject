const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// GET all transactions (protected)
router.get('/', auth, transactionController.getAllTransactions);

// POST a new transaction (protected)
router.post('/', auth, transactionController.addTransaction);

router.delete('/:id', auth, transactionController.deleteTransaction);

// // PUT to update a transaction (protected)
// router.put('/:id', auth, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const { id } = req.params;
//     const { recipient, category, date, amount } = req.body;

//     const transaction = await Transaction.findOneAndUpdate(
//       { _id: id, user: userId },
//       { recipient, category, date, amount },
//       { new: true }
//     );

//     if (!transaction) {
//       return res.status(404).json({ error: 'Transaction not found' });
//     }

//     res.json(transaction);
//   } catch (err) {
//     res.status(400).json({ error: 'Invalid data' });
//   }
// });


// DELETE a transaction (protected)



module.exports = router;