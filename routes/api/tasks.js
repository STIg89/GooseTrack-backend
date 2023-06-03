const express = require('express')
const router = express.Router()
const tasksController = require('../../controllers/tasks')
// const schema = require('../../schemas/taskValidationSchema')

router.get('/tasks', tasksController.listPerMonth)
/*example for success get rout
    http://localhost:4000/api/tasks?month=7
*/
router.post('/tasks', tasksController.create)
/*example for success post rout
{
    "title": "valid task",
    "start": "10:00",
    "end": "11:00",
    "date": "2023-07-05",
    "priority": "medium",
    "category": "in-progress"
}
*/
router.patch('/tasks/:id', tasksController.update)

router.delete('/tasks/:id', tasksController.deleteById)

module.exports = router