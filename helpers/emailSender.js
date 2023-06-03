const sendGridEmail = require("@sendgrid/mail");
require("dotenv").config();
const { EMAIL_SENDER_KEY } = process.env;

sendGridEmail.setApiKey(EMAIL_SENDER_KEY);

const sendEmail = async (receiverEmail, subject, letter) => {
	const email = {
		to: receiverEmail,
		from: "andruha0013@gmail.com",
		subject: subject,
		html: letter,
	};

	await sendGridEmail.send(email);
	return true;
};

module.exports = sendEmail;
