const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register a new admin
const registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      username,
      email,
      password,
    });

    await admin.save();

    const token = generateToken(admin._id);
    admin.token = token;
    await admin.save();

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin login
const authAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const token = generateToken(admin._id);
      admin.token = token;
      await admin.save();

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      });

      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout admin
const logoutAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (admin) {
      admin.token = null;
      await admin.save();
    }

    res.cookie('token', '', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), 
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update admin profile
const updateAdminProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const admin = await Admin.findById(req.user._id);

    if (admin) {
      admin.username = req.body.username || admin.username;

      if (req.body.password) {
        const newPasswordHash = await bcrypt.hash(req.body.password, 10);
        const isUsedBefore = await Promise.all(admin.passwordHistory.map(async (history) => {
          return await bcrypt.compare(req.body.password, history.password);
        }));

        if (isUsedBefore.includes(true)) {
          return res.status(400).json({ message: 'New password cannot be the same as any of the previous passwords' });
        }

        admin.passwordHistory.push({ password: newPasswordHash });
        if (admin.passwordHistory.length > 5) {
          admin.passwordHistory.shift(); // Keep only last 5 passwords
        }

        admin.password = newPasswordHash;
      }

      await admin.save();

      const token = generateToken(admin._id);
      admin.token = token;
      await admin.save();

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      });

      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token,
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    admin.otp = hashedOTP;
    admin.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    const message = `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Password Reset OTP',
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({
      email,
      otpExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    const isOTPValid = await admin.matchOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const isUsedBefore = await Promise.all(admin.passwordHistory.map(async (history) => {
      return await bcrypt.compare(newPassword, history.password);
    }));

    if (isUsedBefore.includes(true)) {
      return res.status(400).json({ message: 'New password cannot be the same as any of the previous passwords' });
    }

    admin.passwordHistory.push({ password: newPasswordHash });
    if (admin.passwordHistory.length > 5) {
      admin.passwordHistory.shift(); // Keep only last 5 passwords
    }

    admin.password = newPasswordHash;
    admin.otp = undefined;
    admin.otpExpire = undefined;
    await admin.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Validate token
const validateToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || admin.token !== token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json({ message: 'Token is valid', admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (error) {
    console.error('Token validation failed:', error.message);
    res.status(401).json({ message: 'Token validation failed' });
  }
};

module.exports = {
  registerAdmin,
  authAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  forgotPassword,
  resetPassword,
  validateToken
};
