require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));

// test route
app.get('/', (req, res) => res.send('API Running'));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
