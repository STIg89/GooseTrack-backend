const Task = require("../../models/task")
const { ctrlWrapper, HttpError } = require('../../helpers')

const listPerMonth = async (req, res) => {
    const { month, page = 1, limit = 1 } = req.query;
    if (month > 12 || month < 0) {
        throw HttpError(400, 'Wrong month. Min value - 1, max - 12')
    }
    const { _id: owner } = req.user;
    const tasks = await Task.aggregate([
        {
            $addFields: {
                month: { $month: '$date' }
            }
        },
        {
            $match: {
                month: Number(month),
                owner: owner
            }
        }
    ]).limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    res.json(tasks);
}

module.exports = ctrlWrapper(listPerMonth)