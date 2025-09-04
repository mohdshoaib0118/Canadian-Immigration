// routes/latestNewsRoutes.js
const express = require('express');
const { createLatestNews,getAllLatestNews,getLatestNewsById,updateLatestNews,deleteLatestNews,
 } = require('../../controller/latestNewController');
const upload = require('../../middleware/multer');
const { verifyToken } = require('../../middleware/authMiddleware');


const router = express.Router();

router.post('/add',verifyToken, upload.single('image'), createLatestNews);
router.get('/getAllLatestNews', getAllLatestNews);
router.get('/getLatestNewsById/:id', getLatestNewsById);
router.put('/edit/:id', verifyToken,upload.single('image'), updateLatestNews); 
router.delete('/delete',verifyToken, deleteLatestNews );

module.exports = router;