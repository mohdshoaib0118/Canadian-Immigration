// models/Contact.js - Mongoose model for contact inquiries
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Employer', 'Aspirant'], 
  },
  message: {
    type: String,
    required: true,
  },

},{timestamps:true});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;