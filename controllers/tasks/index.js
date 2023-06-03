const create = require("./post")
const update = require('./update')
const listPerMonth = require("./list")
const deleteById = require('./delete')
module.exports = {
    create,
    update,
    listPerMonth,
    deleteById
}