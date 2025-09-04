// routes/faqRoutes.js
const express = require('express');
const { createFAQ, getAllFAQs, getFAQById, updateFAQ, deleteFAQ } = require('../../controller/faqController');
const { verifyToken } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, createFAQ);
router.get('/getAllFaqs', getAllFAQs);
router.get('/getFaqById/:id', getFAQById);
router.put('/edit', verifyToken, updateFAQ);
router.delete('/delete', verifyToken, deleteFAQ);

module.exports = router;