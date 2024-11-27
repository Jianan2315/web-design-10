const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/userRoutes');
const cors = require('cors');

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({ origin: 'http://localhost:4000' }));

// Middleware
app.use(bodyParser.json());
app.use('/images', express.static('images')); // Serve images statically
app.use('/user', userRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

module.exports=app;