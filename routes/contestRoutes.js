const express = require('express');
const router = express.Router();
const { createContest, getAllContests, updateContestByTitle, deleteContestByTitle } = require('../apis/contestApi');

router.get('/fetch', getAllContests);
router.post('/insert', createContest);
router.put('/update', updateContestByTitle);
router.delete('/delete', deleteContestByTitle);

module.exports = router;
