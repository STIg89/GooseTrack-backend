const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const dirTemp = path.join(__dirname, '../', 'temp');

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

//-------------------------------------------------------------------

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'avatars',
  allowedFormats: ['jpg', 'png', 'svg'],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

module.exports = { uploadCloud, uploder, cloudinary };
