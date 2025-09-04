// routes/blogRoutes.js
const express = require('express');
const upload = require('../../middleware/multer');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../../controller/blogController');
const { verifyToken } = require('../../middleware/authMiddleware');


const router = express.Router();

router.post('/add',verifyToken, upload.single('image'), createBlog);
router.get('/getAllBlogs', getAllBlogs);
router.get('/getById/:id', getBlogById);
router.put('/edit',verifyToken, upload.single('image'), updateBlog);
router.delete('/delete',verifyToken, deleteBlog);

module.exports = router;