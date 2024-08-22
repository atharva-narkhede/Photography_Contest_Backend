const express = require('express');
const router = express.Router();
const {
  createVote,
  getAllVotes,
  updateVote,
  deleteVote,
  deleteVoteForImage
} = require('../apis/voteApi');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all vote routes
router.use(apiKeyMiddleware); // Correctly use middleware

// Vote Routes
router.get('/fetch', getAllVotes);
router.post('/insert', createVote);
router.put('/update', updateVote);
router.delete('/delete', deleteVote);
router.delete('/deleteimage', deleteVoteForImage);

module.exports = router;
