// models/teamModel.js
const mongoose = require('mongoose');

const ourTeamSchema = new mongoose.Schema({
  image: {
    type: String, // Path or URL to the image
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ourTeam = mongoose.model('ourTeam', ourTeamSchema);

module.exports = ourTeam;