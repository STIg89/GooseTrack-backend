const Task = require("../../models/task")

const listPerMonth = async (req, res) => {
    const { month } = req.query; // Assuming the month is passed as a query parameter
    const tasks = await Task.aggregate([
        {
            $addFields: {
                month: { $month: '$date' }
            }
        },
        {
            $match: {
                month: Number(month)
            }
        }
    ]);

    res.json(tasks);
}

module.exports = listPerMonth