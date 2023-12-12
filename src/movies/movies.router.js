const router = require('express').Router({mergeParams: true})
const controller = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

router.route('/')
        .get(controller.list)
        .all(methodNotAllowed)

router.route("/:movieId")
        .get(controller.read)
        .all(methodNotAllowed)

//read movies then return a list of theaters playing that specific movie
//response will look like theater data plus movie_id
router.route('/:movieId/theaters')

//read movies and return a list of reviews for said movie
//response looks like reviews with movie id and critic info
router.route('/:movieId/reviews')

module.exports = router