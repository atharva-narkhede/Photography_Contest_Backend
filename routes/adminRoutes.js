const express = require('express');
const {
  registerAdmin,
  authAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  forgotPassword,
  resetPassword,
  validateToken
} = require('../apis/adminApi');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateUpdateProfile } = require('../middleware/validators');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const router = express.Router();

router.use(apiKeyMiddleware); // Apply API key middleware to all admin routes

// Admin Authentication and Profile Routes
router.post('/register', validateRegister, registerAdmin);
router.post('/login', validateLogin, authAdmin);
router.post('/logout', protect, logoutAdmin);
router.get('/validateToken', validateToken); // Route for token validation
router.route('/profile').get(protect, getAdminProfile).put(protect, validateUpdateProfile, updateAdminProfile);

// Admin Password Management Routes
router.post('/forgotpassword', validateForgotPassword, forgotPassword);
router.put('/resetpassword', validateResetPassword, resetPassword);

module.exports = router;
