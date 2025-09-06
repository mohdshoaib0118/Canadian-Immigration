// controllers/blogController.js
const blog = require('../models/blogModel');
const Joi = require('joi');
 
 async function createBlog(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, message: "Image is required" });
    }

    const image = `http://localhost:3500/uploads/${req.file.filename}`;
    const blogData = { ...req.body, image };

    const schema = Joi.object({
      heading: Joi.string().trim().min(3).max(100).required(),
      paragraph: Joi.string().trim().min(10).required(),
      image: Joi.string().uri().required()
    });

    const { error, value } = schema.validate(blogData);
    if (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }

    const newBlog = new blog(value);
    await newBlog.save();

    res.status(200).json({
      status: 200,
      message: "New Blog Created Successfully",
      response: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating blog",
      error: error.message,
    });
  }
}



 const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blog.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 200, message: "Blogs fetched successfully", response: blogs });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error fetching blogs', error });
  }
};

 const getBlogById = async (req, res) => {
  try {
    const singleBlog = await blog.findById(req.params.id); 
    if (!singleBlog) {
      return res.status(404).json({status:404, message: "Blog not found" });
    }
    res.status(200).json({status:200,message:"Blog fetched successfully",response:singleBlog});
  } catch (error) {
    res.status(500).json({ status:500,message: "Error fetching blog", error: error.message });
  }
};


 const updateBlog = async (req, res) => {
  try {
    const { heading, paragraph ,_id} = req.body;
    const updatedBlog = await blog.findByIdAndUpdate(
      _id,
      {
        heading,
        paragraph,
        ...(req.file && { image: `http://localhost:3500/uploads/${req.file.filename}` }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ status:404, message: "Blog not found" });
    }

    res.status(200).json({
     status:200,
      message: "Blog updated successfully",
      response: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status:500,
      message: "Error updating blog",
      error: error.message,
    });
  }
};


 const deleteBlog = async (req, res) => {
  try {
    const {_id}=req.body;
    const deletedBlog = await blog.findByIdAndDelete(_id);
    if (!deletedBlog) {
      return res.status(404).json({status:404, message: 'Blog not found' });
    }
    res.status(200).json({status:200, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ status:500,message: 'Error deleting blog', error });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};