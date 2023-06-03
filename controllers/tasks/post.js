const Task = require("../../models/task")

const createTask = async (req, res) => {

    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
}

module.exports = createTask