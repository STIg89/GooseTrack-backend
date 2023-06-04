const express = require('express')
const router = express.Router()
const tasksController = require('../../controllers/tasks')
const { validateBody, authenticate } = require('../../middlewares');

const schema = require('../../schemas')

router.get('', authenticate, tasksController.listPerMonth)

router.post('', authenticate, validateBody(schema.createTaskValidation), tasksController.create)

router.patch('/:id', authenticate, validateBody(schema.updateTaskValidation), tasksController.update)

router.delete('/:id', authenticate, tasksController.deleteById)

module.exports = router