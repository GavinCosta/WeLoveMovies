const service = require("./reviews.service")

async function update(req,res,next) {
    const data = service.update

}

async function destroy(req,res,next) {
    const data = service.delete
}

module.exports = {
    update,
    delete: [destroy]
}