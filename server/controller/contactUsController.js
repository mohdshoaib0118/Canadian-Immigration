 const contactUs = require('../models/contactUsModel');
const sendEmail = require('../utils/nodeMailer');

const submitContact = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, message } = req.body;

  try {
     if (!firstName || !lastName || !email || !phoneNumber || !role || !message) {
      return res.status(400).json({ status: 400, message: 'All fields are required' });
    }

     const newContact = new contactUs({ firstName, lastName, email, phoneNumber, role, message });
    await newContact.save();

     await sendEmail({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      message,
    });

    res.status(200).json({status:200, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({status:500, message: 'Server error' });
  }
};


async function getAllContactUs(req, res) {
    try {
        const allContacts = await contactUs.find().sort({ createdAt: -1 });
        res.status(200).json({ status: 200, message: 'All contacts fetched successfully', response: allContacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ status: 500, message: 'Server error' });
    }
}

module.exports = { submitContact,getAllContactUs };