const express = require('express');
const cors = require('cors'); // You might need to install this
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

const port = process.env.PORT || 8000;

// Connect to DB
connectDb();

const app = express();

// CORS Configuration - ADD THIS FIRST
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`✅ Server started on port ${port}`));