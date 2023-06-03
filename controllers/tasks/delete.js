const Task = require('../../models/task')

const deleteById = async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.json({ message: 'Delete success' })
}

module.exports = deleteById