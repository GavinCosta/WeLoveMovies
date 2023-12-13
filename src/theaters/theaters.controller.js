const theatersService = require("./theaters.service")
//Need to update function in knex to include movies and map to put movies in an obj
async function list(req,res,next) {
       const data = await theatersService.list();
        res.json({data});
    }

module.exports = {
    list
}