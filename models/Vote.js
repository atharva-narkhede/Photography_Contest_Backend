const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    photo_url: String,
    voted_by: String,
    contest_title: String,
    voted_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
