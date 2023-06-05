const { validateBody } = require('./validateBody');
const { validateQuery } = require('./validateQuery')
const authenticate = require('./authenticate');
const uploder = require('./uploader');

module.exports = {
  validateBody,
  authenticate,
  uploder,
  validateQuery
};
