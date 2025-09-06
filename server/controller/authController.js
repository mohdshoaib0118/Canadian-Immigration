const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

 async function registerUser(req,res) {
     try {
    const { name, email, password, phoneNumber } = req.body;

     const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

     const user = new User({
      name,
      email,
      password,
      phoneNumber,
    });

    await user.save();

     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}  

 async function loginUser(req,res) {
      try {
    const { email, password } = req.body;

     const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

     const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

 async function getUserProfile(req,res) {
   try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
   registerUser,
  loginUser,
  getUserProfile
};