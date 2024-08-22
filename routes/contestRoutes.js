const express = require('express');
const router = express.Router();
const {
  createContest,
  getAllContests,
  updateContestByTitle,
  deleteContestByTitle
} = require('../apis/contestApi');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all contest routes
router.use(apiKeyMiddleware); // Correctly use middleware

// Contest Routes
router.get('/fetch', getAllContests);
router.post('/insert', createContest);
router.put('/update', updateContestByTitle);
router.delete('/delete', deleteContestByTitle);

module.exports = router;
