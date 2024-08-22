const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config(); // Load environment variables from .env file

// Import custom middleware
const { errorHandler } = require('./middleware/errorMiddleware');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(helmet()); // Set security-related HTTP headers
app.use(morgan('common')); // Logging HTTP requests

// Apply API Key Middleware globally (if needed for all routes)
app.use(apiKeyMiddleware);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { dbName: "photography", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connection Successful');
    })
    .catch(err => {
        console.log('MongoDB Connection failed', err);
    });

// Import routes
const contestRoutes = require('./routes/contestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const photoRoutes = require('./routes/photoRoutes');
const voteRoutes = require('./routes/voteRoutes');

// Use routes
app.use('/api/contests', contestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/votes', voteRoutes);

// Error handling middleware
app.use(errorHandler); // Custom error handler

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
