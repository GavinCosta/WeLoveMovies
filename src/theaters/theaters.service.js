const knex = require("../db/connection")

//define tableName to use variable for modularization / easy editing
const tableName = "theaters"

function list() {
    return knex(tableName).select("*")
}

module.exports = {
    list
}