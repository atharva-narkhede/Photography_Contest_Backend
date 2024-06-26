const Contest = require('../models/Contest');

// Create a new contest
const createContest = async (req, res) => {
    const contest = new Contest({
        title: req.body.title,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    });
    try {
        const savedContest = await contest.save();
        console.log('Contest created');
        res.send(savedContest);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all contests
const getAllContests = async (req, res) => {
    try {
        const contests = await Contest.find();
        console.log('Data sent');
        res.json(contests);
    } catch (error) {
        console.log('Fetch error :- ', error);
        res.json({ 'message': error });
    }
};

// Update a contest by title
const updateContestByTitle = async (req, res) => {
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
            res.send({ 'update': 'success', updatedContest });
        } else {
            console.log('Contest not updated');
            res.send({ 'update': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a contest by title
const deleteContestByTitle = async (req, res) => {
    const contestTitle = req.body.title;
    try {
        const deletedContest = await Contest.deleteOne({ title: contestTitle });
        if (deletedContest.deletedCount > 0) {
            console.log('Contest Deleted');
            res.send({ 'delete': 'success' });
        } else {
            console.log('Contest Not deleted');
            res.send({ 'delete': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createContest,
    getAllContests,
    updateContestByTitle,
    deleteContestByTitle
};
