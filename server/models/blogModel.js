// models/blogModel.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path to the image
    required: true,
  },
},{timestamps:true});

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;