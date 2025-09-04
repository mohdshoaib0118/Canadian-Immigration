// models/latestNewsModel.js
const mongoose = require('mongoose');

const latestNewsSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path or URL to the image
    required: true,
  },
},{timestamps:true});

const latestNews = mongoose.model('latestNews', latestNewsSchema);

module.exports = latestNews;