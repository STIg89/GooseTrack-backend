const Task = require('../../models/task')

const updateTask = async (req, res, next) => {
    const { id } = req.params
    const result = await Task.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.json(result)
}


module.exports = updateTask