const { check } = require('express-validator');

// User Validators
const validateRegister = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

const validateForgotPassword = [
  check('email', 'Please include a valid email').isEmail(),
];

const validateResetPassword = [
  check('resetToken', 'Reset token is required').not().isEmpty(),
  check('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateUpdateProfile = [
  check('username', 'Username is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
];

// Admin Validators
const validateAdminCreate = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateAdminUpdate = [
  check('username', 'Username is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
];

// Contest Validators
const validateContestCreate = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('start_date', 'Start date is required').not().isEmpty(),
  check('end_date', 'End date is required').not().isEmpty(),
];

const validateContestUpdate = [
  check('title', 'Title is required').optional().not().isEmpty(),
  check('description', 'Description is required').optional().not().isEmpty(),
  check('start_date', 'Start date is required').optional().not().isEmpty(),
  check('end_date', 'End date is required').optional().not().isEmpty(),
];

// Photo Validators
// Photo Validators
const validatePhotoCreate = [
  check('contest_title', 'Contest title is required').not().isEmpty(),
  check('uploaded_by', 'Uploaded by is required').not().isEmpty(),
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
  check('photo_url', 'Photo URL is required').isURL().withMessage('Photo URL must be a valid URL'),
];

const validatePhotoUpdate = [
  check('contest_title', 'Contest title is required').not().isEmpty(),
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
  check('photo_url', 'Photo URL is required').isURL().withMessage('Photo URL must be a valid URL'),
];

const validatePhotoDelete = [
  check('contest_title', 'Contest title is required').not().isEmpty(),
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
];

const validateDeletePhotosByContestTitle = [
  check('contest_title', 'Contest title is required').not().isEmpty(),
];

// Vote Validators
const validateVoteCreate = [
  check('photo_url', 'Photo URL is required').isURL().withMessage('Photo URL must be a valid URL'),
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
  check('contest_title', 'Contest title is required').not().isEmpty(),
];

const validateVoteUpdate = [
  check('photo_url', 'Photo URL is required').isURL().withMessage('Photo URL must be a valid URL'),
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
  check('contest_title', 'Contest title is required').not().isEmpty(),
];

const validateVoteDelete = [
  check('email', 'Email is required').isEmail().withMessage('Please provide a valid email'),
  check('contest_title', 'Contest title is required').not().isEmpty(),
];

const validateDeleteVotesByPhotoURL = [
  check('photo_url', 'Photo URL is required').isURL().withMessage('Photo URL must be a valid URL'),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateProfile,
  validateAdminCreate,
  validateAdminUpdate,
  validateContestCreate,
  validateContestUpdate,
  validatePhotoCreate,
  validatePhotoUpdate,
  validatePhotoDelete,
  validateDeletePhotosByContestTitle,
  validateVoteCreate,
  validateVoteUpdate,
  validateVoteDelete,
  validateDeleteVotesByPhotoURL,
};
