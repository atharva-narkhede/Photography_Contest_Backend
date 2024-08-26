const express = require('express');
const router = express.Router();
const {
  createContest,
  getAllContests,
  updateContestByTitle,
  deleteContestByTitle
} = require('../apis/contestApi');
const {
  validateContestCreate,
  validateContestUpdate
} = require('../middleware/validators');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

// Apply API key middleware globally to all contest routes
router.use(apiKeyMiddleware);

// Contest Routes
router.get('/fetch', getAllContests);
router.post('/insert', validateContestCreate, createContest);
router.put('/update', validateContestUpdate, updateContestByTitle);
router.delete('/delete', deleteContestByTitle);

module.exports = router;
