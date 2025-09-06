const nodemailer = require('nodemailer');
const { contactUsMailTemplate } = require('../templates/contactUs');  

const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,  
    },
  });
const htmlContent = await contactUsMailTemplate(data);
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: data.email,  
    subject: 'New Contact Inquiry',
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;