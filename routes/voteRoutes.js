const express = require('express');
const router = express.Router();
const {
  createVote,
  getAllVotes,
  updateVote,
  deleteVote,
  deleteVoteForImage
} = require('../apis/voteApi');
const {
  validateVoteCreate,
  validateVoteUpdate,
  validateVoteDelete,
  validateDeleteVotesByPhotoURL
} = require('../middleware/validators');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all vote routes
router.use(apiKeyMiddleware);

// Vote Routes
router.get('/fetch', getAllVotes);
router.post('/insert', validateVoteCreate, createVote);
router.put('/update', validateVoteUpdate, updateVote);
router.delete('/delete', validateVoteDelete, deleteVote);
router.delete('/deleteimage', validateDeleteVotesByPhotoURL, deleteVoteForImage);

module.exports = router;
