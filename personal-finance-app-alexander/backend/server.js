require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- Add this line
const connectDB = require('./config/db');

const app = express();
app.use(cors()); // <-- Add this line
connectDB();

app.use(express.json());

// Example route
app.get('/', (req, res) => res.send('API Running'));

// Auth and transaction routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));