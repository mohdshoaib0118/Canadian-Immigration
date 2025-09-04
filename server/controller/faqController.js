// controllers/faqController.js
const faq = require('../models/faqModel');
const Joi = require('joi');

async function createFAQ(req, res) {
  try {
    const { question, answer } = req.body;
    const schema = Joi.object({
      question: Joi.string().trim().min(3).max(200).required(),
      answer: Joi.string().trim().min(10).required(),
    });

    const { error, value } = schema.validate({ question, answer });
    if (error) {
      return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const newFAQ = new faq(value);
    await newFAQ.save();

    res.status(201).json({
      status: 201,
      message: "New FAQ Created Successfully",
      response: newFAQ,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error creating FAQ",
      error: error.message,
    });
  }
}

// Get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await faq.find().sort({ createdAt: -1 });
    res.status(200).json({ status: 200, message: "FAQs fetched successfully", response: faqs });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error fetching FAQs', error });
  }
};

// Get a single FAQ by ID
const getFAQById = async (req, res) => {
  try {
    const singleFAQ = await faq.findById(req.params.id); 
    if (!singleFAQ) {
      return res.status(404).json({ status: 404, message: "FAQ not found" });
    }
    res.status(200).json({ status: 200, message: "FAQ fetched successfully", response: singleFAQ });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Error fetching FAQ", error: error.message });
  }
};

// Update a FAQ
const updateFAQ = async (req, res) => {
  try {
    const { question, answer, _id } = req.body;
    const updatedFAQ = await faq.findByIdAndUpdate(
      _id,
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ status: 404, message: "FAQ not found" });
    }

    res.status(200).json({
      status: 200,
      message: "FAQ updated successfully",
      response: updatedFAQ,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating FAQ",
      error: error.message,
    });
  }
};

// Delete a FAQ
const deleteFAQ = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedFAQ = await faq.findByIdAndDelete(_id);
    if (!deletedFAQ) {
      return res.status(404).json({ status: 404, message: 'FAQ not found' });
    }
    res.status(200).json({ status: 200, message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Error deleting FAQ', error });
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
};