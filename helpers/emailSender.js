const sendGridEmail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_API_KEY, EMAIL } = process.env;

sendGridEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (receiverEmail, subject, letter) => {
  try {
    console.log();
    const email = {
      to: receiverEmail,
      from: EMAIL,
      subject: subject,
      html: letter,
    };
    //console.log(email);
    await sendGridEmail.send(email);
    return true;
  } catch (error) {
    console.error(`sendGrid error ${error.message}`);
  }
};

module.exports = sendEmail;
