const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // If no token found, return unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Decode token to get user/admin ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try to find the user or admin based on the decoded ID
    let user = await User.findById(decoded.id).select('-password');
    if (!user) {
      user = await Admin.findById(decoded.id).select('-password');
    }

    // If no user or admin found or token doesn't match, return unauthorized error
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }

    // Attach the user/admin to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
