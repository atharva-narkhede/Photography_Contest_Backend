const Vote = require('../models/Vote');

// Create a new vote
const createVote = async (req, res) => {
    const { photo_url, voted_by, contest_title } = req.body;
    try {
        const vote = new Vote({ photo_url, voted_by, contest_title });
        const savedVote = await vote.save();
        console.log('Vote created:', savedVote);
        res.status(201).json(savedVote);
    } catch (error) {
        console.error('Create vote error:', error);
        res.status(400).json({ error: error.message });
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
    const { voted_by, photo_url, contest_title } = req.body;
    try {
        const updatedVote = await Vote.findOneAndUpdate(
            { voted_by: voted_by },
            { photo_url: photo_url, contest_title: contest_title },
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
        res.status(400).json({ error: error.message });
    }
};

// Delete a vote
const deleteVote = async (req, res) => {
    const { contest_title } = req.body;
    try {
        const deletedVotes = await Vote.deleteMany({ contest_title: contest_title });
        if (deletedVotes.deletedCount > 0) {
            console.log(`${deletedVotes.deletedCount} votes deleted for contest title: ${contest_title}`);
            res.json({ delete: 'success', deletedCount: deletedVotes.deletedCount });
        } else {
            console.log('No votes found for contest title:', contest_title);
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete vote error:', error);
        res.status(400).json({ error: error.message });
    }
};

const deleteVoteForImage = async (req, res) => {
    const { photo_url } = req.body; // Assuming 'image_url' is the field representing the image URL
    try {
        const deletedVotes = await Vote.deleteMany({ photo_url: photo_url });
        if (deletedVotes.deletedCount > 0) {
            console.log(`${deletedVotes.deletedCount} votes deleted for image URL: ${image_url}`);
            res.json({ delete: 'success', deletedCount: deletedVotes.deletedCount });
        } else {
            console.log('No votes found for image URL:', image_url);
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete vote error:', error);
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createVote,
    getAllVotes,
    updateVote,
    deleteVote,
    deleteVoteForImage
};
