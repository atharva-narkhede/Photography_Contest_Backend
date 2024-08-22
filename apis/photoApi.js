const { validationResult } = require('express-validator');
const Photo = require('../models/Photo');

// Create a new photo
const createPhoto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { contest_title, uploaded_by, photo_url } = req.body;

    try {
        const existingPhoto = await Photo.findOne({ uploaded_by, contest_title });
        if (existingPhoto) {
            return res.status(400).json({ error: "You have already participated in this contest." });
        }

        const photo = new Photo({ contest_title, uploaded_by, photo_url });
        const savedPhoto = await photo.save();
        console.log('Photo uploaded:', savedPhoto);
        res.status(200).json(savedPhoto);
    } catch (error) {
        console.error('Create photo error:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get all photos
const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        console.log('Data sent');
        res.json(photos);
    } catch (error) {
        console.log('Fetch error :- ', error);
        res.json({ 'message': error });
    }
};

// Update a photo using contest_title and uploaded_by
const updatePhoto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { contest_title, uploaded_by, photo_url } = req.body;
    const photoUpdate = { photo_url };

    try {
        const updatedPhoto = await Photo.updateOne(
            { contest_title, uploaded_by },
            photoUpdate
        );
        if (updatedPhoto.modifiedCount > 0) {
            console.log('Photo Updated', updatedPhoto);
            res.send({ 'update': 'success', updatedPhoto });
        } else {
            console.log('Photo not updated');
            res.send({ 'update': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a photo using contest_title and uploaded_by
const deletePhoto = async (req, res) => {
    const { contest_title, uploaded_by } = req.body;

    try {
        const deletedPhoto = await Photo.deleteOne({ contest_title, uploaded_by });
        if (deletedPhoto.deletedCount > 0) {
            console.log('Photo Deleted');
            res.send({ 'delete': 'success' });
        } else {
            console.log('Photo Not deleted');
            res.send({ 'delete': 'Record Not Found' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete photos by contest title
const deletePhotosByContestTitle = async (req, res) => {
    const { contest_title } = req.body;

    try {
        const deletedPhotos = await Photo.deleteMany({ contest_title });
        if (deletedPhotos.deletedCount > 0) {
            console.log(`${deletedPhotos.deletedCount} photos deleted for contest title: ${contest_title}`);
            res.json({ delete: 'success', deletedCount: deletedPhotos.deletedCount });
        } else {
            console.log('No photos found for contest title:', contest_title);
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete photos error:', error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createPhoto,
    getAllPhotos,
    updatePhoto,
    deletePhoto,
    deletePhotosByContestTitle
};
