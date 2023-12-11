const knex = require("../db/connection")

//define tableName to use variable for modularization / easy editing
const tableName = "reviews"
//list function
function list() {
    return knex(tableName).select("*")
}
//update function
function update() {
    return knex(tableName).select("*")
}
//delete function
function destroy() {

}

module.exports = {
    list,
    update,
    destroy
}