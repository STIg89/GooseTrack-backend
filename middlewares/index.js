const { validateBody, validateTaskBody } = require("./validateBody");
const authenticate = require("./authenticate");
const uploder = require("./uploader");

module.exports = {
	validateBody,
	validateTaskBody,
	authenticate,
	uploder,
};
