const express = require('express');
const router = express.Router();
const { createPhoto, getAllPhotos, updatePhoto, deletePhoto ,deletePhotosByContestTitle} = require('../apis/photoApi');

router.get('/fetch', getAllPhotos);
router.post('/insert', createPhoto);
router.put('/update', updatePhoto);
router.delete('/delete', deletePhoto);
router.delete('/deleteall', deletePhotosByContestTitle);

module.exports = router;
