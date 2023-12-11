const knex = require("../db/connection")

//define tableName to use variable for modularization / easy editing
const tableName = "reviews"
//update function
function update() {
    return knex(tableName).select("*")
}
//delete function
function destroy() {

}

module.exports = {
    update,
    destroy
}