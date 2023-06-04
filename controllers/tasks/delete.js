const Task = require('../../models/task')
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteById = async (req, res) => {
    const { id } = req.params
    const { _id: owner } = req.user;
    const result = await Task.findOneAndDelete({ _id: id, owner });
    if (!result) {
        throw HttpError(404);
    }
    res.json({ message: 'Deleted successfully!' });
}

module.exports = ctrlWrapper(deleteById)