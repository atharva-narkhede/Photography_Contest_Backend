const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Importing cors
require('dotenv').config(); // Load environment variables from .env file

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { dbName: "photography", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection Successful');
    })
    .catch(err => {
        console.log('Connection failed', err);
    });

// Import routes
const contestRoutes = require('./routes/contestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const voteRoutes = require('./routes/voteRoutes');

// Use routes
app.use('/contests', contestRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/photos', photoRoutes);
app.use('/votes', voteRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
