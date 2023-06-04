const Task = require('../../models/task')
const { isValidObjectId } = require('mongoose')
const { HttpError, ctrlWrapper } = require('../../helpers')
const updateTask = async (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        throw HttpError(400, 'Invalid task_id');
    }
    const { _id: owner } = req.user;
    const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body, {
        new: true
    })
    if (!result) {
        throw HttpError(404);
    }
    res.json(result);
}

module.exports = ctrlWrapper(updateTask)