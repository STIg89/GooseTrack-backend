const { validateBody } = require('./validateBody');
const { validateQuery } = require('./validateQuery');
const auth = require('./auth');
const { uploder, uploadCloud, cloudinary } = require('./uploader');
const passport = require('./passport');

module.exports = {
  validateBody,
  auth,
  uploder,
  uploadCloud,
  validateQuery,
  cloudinary,
  passport,
};
