const {
  registrationSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
  refreshSchema,
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
  createTaskValidation,
  updateTaskValidation,
  updateUserSchema,
  reveiwSchema,
  updateRewSchema,
  listTasksPerMonth,
};
