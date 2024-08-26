const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    contest_title: String,
    uploaded_by: String,  
    email: { type: String, required: true },  
    photo_url: String,
    uploaded_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', photoSchema);
