const Task = require("../../models/task")
const { HttpError, ctrlWrapper } = require('../../helpers');
const createTask = async (req, res) => {
    const { _id: owner } = req.user;
    const { start, end } = req.body;
    if (start >= end) {
        throw HttpError(400, "End time must be greater than Start time.");
    }
    const newTask = await Task.create({ ...req.body, owner });
    res.status(201).json(newTask);
}

module.exports = ctrlWrapper(createTask)