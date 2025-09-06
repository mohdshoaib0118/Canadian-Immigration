// routes/contactRoutes.js - Routes for contact form
const express = require('express');
const { submitContact ,getAllContactUs} = require('../../controller/contactUsController');
const { verifyToken } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/sendMail', submitContact);
router.get('/getAllContactUs',verifyToken, getAllContactUs);

module.exports = router;