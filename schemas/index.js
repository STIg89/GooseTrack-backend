const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
  refreshSchema,
  passSchema,
} = require('./user');
const {
  createTaskValidation,
  updateTaskValidation,
  listTasksPerMonth,
} = require('./taskValidationSchema');
const { reveiwSchema, updateRewSchema } = require('./review');

module.exports = {
  registrationSchema,
  loginSchema,
  emailSchema,
  refreshSchema,
  passSchema,
  createTaskValidation,
  updateTaskValidation,
  updateUserSchema,
  reveiwSchema,
  updateRewSchema,
  listTasksPerMonth,
};
