const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const passwordHistorySchema = new mongoose.Schema({
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  otp: { type: String },
  otpExpire: { type: Date },
  passwordHistory: [passwordHistorySchema]
});

// Pre-save middleware to hash the password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare the entered password with the hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to compare the entered OTP with the hashed OTP
adminSchema.methods.matchOTP = async function (enteredOTP) {
  return await bcrypt.compare(enteredOTP, this.otp);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
