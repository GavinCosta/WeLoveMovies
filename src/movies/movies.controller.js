const moviesService = require("./movies.service");
const knex = require("../db/connection");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//create movie exists validator for movies/:movieId where movieId === movie_id
async function movieExists(req, res, next) {
  const movieId = req.params.movieId;
  try {
    const foundMovie = await moviesService.read(movieId);
    if (foundMovie) {
      res.locals.foundMovie = foundMovie;
      next();
    } else {
      res.status(404).json({ error: `Movie cannot be found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
//movies/:movieId should return movie details - read

//movies/:movieId/theaters should return theaters with specificied id (call in tables db) - read

//movies/:movieId/reviews return reviews with critic for specified id (call in reviews db) - read
//check for isShowing
async function list(req, res, next) {
    // console.log("LIST ----------------")
    // console.log("request.query ------------", req.query.is_showing)
    // determine whether req.query isShowing = true
    // call other function if true (listShowing)
    console.log(typeof req.query.is_showing)
    if (req.query.is_showing === 'true') {
        const data = await moviesService.listShowing()
       return res.json({ data });
    } const data = await moviesService.list()
    // const data = await moviesService.list().then()
    
    //if true filter movies.isShowing = true else res.json
  res.json({ data });
}

async function read(req, res, next) {
  const { foundMovie } = res.locals;
  res.json({ data: foundMovie });
}

module.exports = {
  list,
  read: [movieExists, asyncErrorBoundary(read)],
};
