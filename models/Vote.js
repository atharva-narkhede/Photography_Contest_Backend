const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    photo_url: String,
    email: { type: String, required: true },  // Updated to use email instead of voted_by
    contest_title: String,
    voted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
