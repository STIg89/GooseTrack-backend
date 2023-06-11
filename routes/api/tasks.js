const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasks');
const { validateBody, auth, validateQuery } = require('../../middlewares');

const schema = require('../../schemas');

router.get(
  '',
  auth,
  validateQuery(schema.listTasksPerMonth),
  tasksController.listPerMonth
);

router.post(
  '',
  auth,
  validateBody(schema.createTaskValidation),
  tasksController.create
);

router.patch(
  '/:id',
  auth,
  validateBody(schema.updateTaskValidation),
  tasksController.update
);

router.delete('/:id', auth, tasksController.deleteById);

module.exports = router;
