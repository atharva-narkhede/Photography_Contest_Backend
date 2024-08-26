const { validationResult } = require('express-validator');
const Contest = require('../models/Contest');

// Create a new contest
const createContest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log('Request body:', req.body); // Debugging log

    const contest = new Contest({
        title: req.body.title,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });

    try {
        const savedContest = await contest.save();
        console.log('Contest created:', savedContest);
        res.status(201).send(savedContest);
    } catch (error) {
        console.error('Error creating contest:', error);
        res.status(500).send(error);
    }
};

// Get all contests
const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        console.log('Data sent');
        res.status(200).json(contests);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a contest by title
const updateContestByTitle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log('Request body:', req.body); // Debugging log

    const contestTitle = req.body.title;
    const contestUpdate = {
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };

    try {
        const updatedContest = await Contest.updateOne(
            { title: contestTitle },
            contestUpdate
        );
        if (updatedContest.modifiedCount > 0) {
            console.log('Contest Updated', updatedContest);
            res.status(200).json({ update: 'success', updatedContest });
        } else {
            console.log('Contest not updated');
            res.status(404).json({ update: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).send(error);
    }
};

// Delete a contest by title
const deleteContestByTitle = async (req, res) => {
    const contestTitle = req.body.title;

    try {
        const deletedContest = await Contest.deleteOne({ title: contestTitle });
        if (deletedContest.deletedCount > 0) {
            console.log('Contest Deleted');
            res.status(200).json({ delete: 'success' });
        } else {
            console.log('Contest Not deleted');
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).send(error);
    }
};

module.exports = {
    createContest,
    getAllContests,
    updateContestByTitle,
    deleteContestByTitle
};
