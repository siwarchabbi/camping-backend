require('dotenv').config(); // MUST be first

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
