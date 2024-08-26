const { validationResult } = require('express-validator');
const Photo = require('../models/Photo');

// Create a new photo
const createPhoto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { contest_title, uploaded_by, email, photo_url } = req.body;

    try {
        const existingPhoto = await Photo.findOne({ email, contest_title });
        if (existingPhoto) {
            return res.status(400).json({ error: "You have already participated in this contest using this email." });
        }

        const photo = new Photo({ contest_title, uploaded_by, email, photo_url });
        const savedPhoto = await photo.save();
        console.log('Photo uploaded:', savedPhoto);
        res.status(200).json(savedPhoto);
    } catch (error) {
        console.error('Create photo error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get all photos
const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        console.log('Data sent');
        res.status(200).json(photos);
    } catch (error) {
        console.error('Fetch error :- ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a photo using contest_title and uploaded_by
const updatePhoto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { contest_title, email, photo_url } = req.body;

    try {
        const updatedPhoto = await Photo.findOneAndUpdate(
            { contest_title, email },
            { photo_url },
            { new: true }
        );
        if (updatedPhoto) {
            console.log('Photo Updated', updatedPhoto);
            res.status(200).json({ update: 'success', updatedPhoto });
        } else {
            console.log('Photo not found');
            res.status(404).json({ update: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Update photo error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Delete a photo using contest_title and uploaded_by
const deletePhoto = async (req, res) => {
    const { contest_title, email } = req.body;

    try {
        const deletedPhoto = await Photo.findOneAndDelete({ contest_title, email });
        if (deletedPhoto) {
            console.log('Photo Deleted:', deletedPhoto);
            res.status(200).json({ delete: 'success' });
        } else {
            console.log('Photo not found');
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete photo error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete photos by contest title
const deletePhotosByContestTitle = async (req, res) => {
    const { contest_title } = req.body;

    try {
        const deletedPhotos = await Photo.deleteMany({ contest_title });
        if (deletedPhotos.deletedCount > 0) {
            console.log(`${deletedPhotos.deletedCount} photos deleted for contest title: ${contest_title}`);
            res.status(200).json({ delete: 'success', deletedCount: deletedPhotos.deletedCount });
        } else {
            console.log('No photos found for contest title:', contest_title);
            res.status(404).json({ delete: 'Record Not Found' });
        }
    } catch (error) {
        console.error('Delete photos error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPhoto,
    getAllPhotos,
    updatePhoto,
    deletePhoto,
    deletePhotosByContestTitle
};
