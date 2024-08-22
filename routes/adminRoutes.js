const express = require('express');
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin
} = require('../apis/adminApi');
const apiKeyMiddleware = require('../middleware/apikeymiddleware'); // Correctly import

// Apply API key middleware globally to all admin routes
router.use(apiKeyMiddleware); // Correctly use middleware

// Admin Routes
router.get('/fetch', getAdmins);
router.post('/insert', createAdmin);
router.put('/update', updateAdmin);
router.delete('/delete', deleteAdmin);

module.exports = router;
