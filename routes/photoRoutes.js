const express = require('express');
const router = express.Router();
const {
  createPhoto,
  getAllPhotos,
  updatePhoto,
  deletePhoto,
  deletePhotosByContestTitle
} = require('../apis/photoApi');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all photo routes
router.use(apiKeyMiddleware); // Correctly use middleware

// Photo Routes
router.get('/fetch', getAllPhotos);
router.post('/insert', createPhoto);
router.put('/update', updatePhoto);
router.delete('/delete', deletePhoto);
router.delete('/deleteall', deletePhotosByContestTitle);

module.exports = router;
