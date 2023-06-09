const { validateBody } = require('./validateBody');
const { validateQuery } = require('./validateQuery');
const authenticate = require('./authenticate');
const { uploder, uploadCloud, cloudinary } = require('./uploader');
const passport = require('./google_authenticate');

module.exports = {
  validateBody,
  authenticate,
  uploder,
  uploadCloud,
  validateQuery,
  cloudinary,
  passport,
};
