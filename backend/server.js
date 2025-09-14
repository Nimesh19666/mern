const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

const port = process.env.PORT || 8000;

// Connect to DB
connectDb();

const app = express();

// Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`✅ Server started on port ${port}`));
