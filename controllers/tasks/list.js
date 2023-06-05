const Task = require("../../models/task")
const { ctrlWrapper, HttpError } = require('../../helpers')

const listPerMonth = async (req, res) => {

    const { month, day, year, page = 1, limit = 100 } = req.query;
    if (month > 12 || month < 0) {
        throw HttpError(400, 'Wrong month. Min value - 1, max - 12')
    }
    const { _id: owner } = req.user;
    const matchQuery = {
        month: Number(month),
        owner: owner
    };
    if (day) {
        matchQuery.day = Number(day);
    }
    if (year) {
        matchQuery.year = Number(year);
    }
    const tasks = await Task.aggregate([
        {
            $addFields: {
                month: { $month: '$date' },
                day: { $dayOfMonth: '$date' },
                year: { $year: '$date' }
            }
        },
        {
            $match: matchQuery
        },
        {
            $sort: { day: 1 }
        },
        {
            $skip: Number((page - 1) * limit)
        },
        {
            $limit: Number(limit * 1)
        }
    ])
    res.json(tasks);
}

module.exports = ctrlWrapper(listPerMonth)