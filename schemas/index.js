const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
} = require('./user');

const { reveiwSchema, updateRewSchema } = require('./review');

module.exports = {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
  reveiwSchema,
  updateRewSchema,
};
