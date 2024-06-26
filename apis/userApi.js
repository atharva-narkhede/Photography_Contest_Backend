const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        console.log('User created');
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Data sent');
        res.json(users);
    } catch (error) {
        console.log('Fetch error :- ', error);
        res.json({ 'message': error });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const email = req.body.email;
    const userUpdate = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const updatedUser = await User.updateOne({ email: email }, userUpdate);
        if (updatedUser.modifiedCount != 0) {
            console.log('User Updated', updatedUser);
            res.send({ 'update': 'success' });
        } else {
            console.log('User not updated');
            res.send({ 'update': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const email = req.body.email;
    try {
        const deletedUser = await User.deleteOne({ email:email });
        if (deletedUser.deletedCount != 0) {
            console.log('User Deleted');
            res.send({ 'delete': 'success' });
        } else {
            console.log('User Not deleted');
            res.send({ 'delete': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
