const service = require("./reviews.service")
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

//write validator for if a review exists
async function reviewExists(req,res,next) {
    //get review from params
    const {reviewId} = req.params
   // console.log(reviewId) //got id
try{
const foundReview = await service.read(reviewId)
//console.log(foundReview) //foundReview works
if (foundReview) {
    res.locals.review = foundReview
    //console.log(res.locals.review)
    next()
} else {
    res.status(404).json({ error: `Review cannot be found` });
    }
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function list(req,res,next) {
    const data = await service.list(req.params.movieId)
    res.json({data})
}

async function read(req,res,next) {
    //pull the foundReview from exists validator
    const foundReview = res.locals.review
 //   console.log(foundReview) //undefined look at validator
    //return it
    res.json({data: foundReview})
    //**Dont need to perform read when validator does it for us */
}

async function update(req,res,next) {
    try {
        const updatedReview = {
            ...req.body.data, review_id: res.locals.review.review_id
        }
        const data = await service.update(updatedReview)
        res.status(200).json({data})
    } catch(error) {
        next(error)
    }
}

async function destroy(req,res,next) {
    const {reviewId} = req.params
    try {
        await service.destroy(reviewId)
        res.status(204).send()
    } catch(error) {
        next(error)
    }
}

module.exports = {
    list,
    read: [reviewExists, asyncErrorBoundary(read)],
    update: [reviewExists, asyncErrorBoundary(update)],
    delete: [reviewExists, asyncErrorBoundary(destroy)]
}

