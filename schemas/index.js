const { registrationSchema, loginSchema, emailSchema } = require('./user');
const { createTaskValidation, updateTaskValidation } = require('./taskValidationSchema')
module.exports = {
  registrationSchema,
  loginSchema,
  emailSchema,
  createTaskValidation,
  updateTaskValidation
};
