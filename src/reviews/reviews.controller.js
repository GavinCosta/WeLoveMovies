const service = require("./reviews.service")

async function list(req,res,next) {
    const data = await service.list(req.params.movieId)
    res.json({data})
}

async function update(req,res,next) {
    const data = await service.update(req.body.data)

}

async function destroy(req,res,next) {
    const data = service.delete
}

module.exports = {
    list,
    update,
    delete: [destroy]
}