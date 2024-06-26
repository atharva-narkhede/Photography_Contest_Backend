const express = require('express');
const router = express.Router();
const { createVote, getAllVotes, updateVote, deleteVote ,deleteVoteForImage} = require('../apis/voteApi');

router.get('/fetch', getAllVotes);
router.post('/insert', createVote);
router.put('/update', updateVote);
router.delete('/delete', deleteVote);
router.delete('/deleteimage', deleteVoteForImage);

module.exports = router;
