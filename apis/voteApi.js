const { validationResult } = require('express-validator');
const Vote = require('../models/Vote');

// Create a new vote
const createVote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { photo_url, email, contest_title } = req.body;

    try {
        const existingVote = await Vote.findOne({ email, contest_title });
        if (existingVote) {
            return res.status(400).json({ error: "You have already voted in this contest using this email." });
        }

        const vote = new Vote({ photo_url, email, contest_title });
        const savedVote = await vote.save();
        console.log('Vote created:', savedVote);
        res.status(201).json(savedVote);
    } catch (error) {
        console.error('Create vote error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get all votes
const getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.find();
        console.log('All votes retrieved');
        res.json(votes);
    } catch (error) {
        console.error('Fetch votes error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a vote
const updateVote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, photo_url, contest_title } = req.body;

    try {
        const updatedVote = await Vote.findOneAndUpdate(
            { email, contest_title },
            { photo_url },
            { new: true }
        );
        if (updatedVote) {
            console.log('Vote updated:', updatedVote);
            res.json({ update: 'success', updatedVote });
        } else {
            console.log('Vote not found');
            res.status(404).json({ update: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Update vote error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Delete a vote
const deleteVote = async (req, res) => {
    const { email, contest_title } = req.body;

    try {
        const deletedVote = await Vote.findOneAndDelete({ email, contest_title });
        if (deletedVote) {
            console.log('Vote deleted:', deletedVote);
            res.status(200).json({ delete: 'success' });
        } else {
            console.log('No votes found for this email and contest title');
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete vote error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Delete votes by photo URL
const deleteVoteForImage = async (req, res) => {
    const { photo_url } = req.body;

    try {
        const deletedVotes = await Vote.deleteMany({ photo_url });
        if (deletedVotes.deletedCount > 0) {
            console.log(`${deletedVotes.deletedCount} votes deleted for image URL: ${photo_url}`);
            res.status(200).json({ delete: 'success', deletedCount: deletedVotes.deletedCount });
        } else {
            console.log('No votes found for image URL:', photo_url);
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete vote error:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createVote,
    getAllVotes,
    updateVote,
    deleteVote,
    deleteVoteForImage
};
