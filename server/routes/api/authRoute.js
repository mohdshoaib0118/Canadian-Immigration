const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../../controller/authController');
const { verifyToken } = require('../../middleware/authMiddleware');

const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Protected Profile Route
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;


 