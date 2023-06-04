const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
} = require('./user');
const { createTaskValidation, updateTaskValidation } = require('./taskValidationSchema')
const { reveiwSchema, updateRewSchema } = require('./review');

module.exports = {
  registrationSchema,
  loginSchema,
  emailSchema,
  createTaskValidation,
  updateTaskValidation,
  updateUserSchema,
  reveiwSchema,
  updateRewSchema,
};
