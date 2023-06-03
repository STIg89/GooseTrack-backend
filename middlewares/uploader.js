const multer = require("multer");
const path = require("path");

const dirTemp = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
	destination: dirTemp,
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	},
});

const uploder = multer({
	storage: multerConfig,
});

module.exports = uploder;
