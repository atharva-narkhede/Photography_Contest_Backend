const Admin = require('../models/Admin');

// Create a new admin
const createAdmin = async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedAdmin = await admin.save();
        console.log('Admin created');
        res.send(savedAdmin);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        console.log('Data sent');
        res.json(admins);
    } catch (error) {
        console.log('Fetch error :- ', error);
        res.json({ 'message': error });
    }
};

// Update an admin
const updateAdmin = async (req, res) => {
    const email = req.body.email;
    const adminUpdate = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const updatedAdmin = await Admin.updateOne({ email: email }, adminUpdate);
        if (updatedAdmin.modifiedCount != 0) {
            console.log('Admin Updated', updatedAdmin);
            res.send({ 'update': 'success' });
        } else {
            console.log('Admin not updated');
            res.send({ 'update': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    const email = req.body.email;
    try {
        const deletedAdmin = await Admin.deleteOne({ email: email });
        if (deletedAdmin.deletedCount != 0) {
            console.log('Admin Deleted');
            res.send({ 'delete': 'success' });
        } else {
            console.log('Admin Not deleted');
            res.send({ 'delete': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    createAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin
};
