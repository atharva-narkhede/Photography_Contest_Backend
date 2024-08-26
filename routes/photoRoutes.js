const express = require('express');
const router = express.Router();
const {
  createPhoto,
  getAllPhotos,
  updatePhoto,
  deletePhoto,
  deletePhotosByContestTitle
} = require('../apis/photoApi');
const {
  validatePhotoCreate,
  validatePhotoUpdate,
  validatePhotoDelete,
  validateDeletePhotosByContestTitle
} = require('../middleware/validators');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all photo routes
router.use(apiKeyMiddleware); // Correctly use middleware

// Photo Routes
router.get('/fetch', getAllPhotos);
router.post('/insert', validatePhotoCreate, createPhoto);
router.put('/update', validatePhotoUpdate, updatePhoto);
router.delete('/delete', validatePhotoDelete, deletePhoto);
router.delete('/deleteall', validateDeletePhotosByContestTitle, deletePhotosByContestTitle);

module.exports = router;
