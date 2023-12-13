const moviesService = require("./movies.service");
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

async function readTheaters(req, res, next) {
    //console.log("READTHEATERS**************")
    const {movieId} = req.params
        //console.log("INSIDE")
        const data = await moviesService.readTheaters(movieId)
        // console.log(data, "XXXXXXXXXXXXXXXXXXX")
        res.json({data})
}

async function readReviews(req,res,next) {
//get movieId from params
const {movieId} = req.params
//set review data into a variable
const reviews = await moviesService.readReviews(movieId)
//reformat review data to create a critics object, using aliased keys to populate same named properties
const formattedReviews = reviews.map((review) => ({
  review_id: review.review_id,
  content: review.content,
  score: review.score,
  created_at: review.created_at,
  updated_at: review.updated_at,
  critic_id: review.critic_id,
  movie_id: review.movie_id,
  critic: {
    critic_id: review.critic_id,
    preferred_name: review.preferred_name,
    surname: review.surname,
    organization_name: review.organization_name,
    created_at: review.critic_created_at,
    updated_at: review.critic_updated_at,
  },
}));
//send variable back in res
  res.json({data: formattedReviews})
}

module.exports = {
  list,
  read: [movieExists, asyncErrorBoundary(read)],
  readTheaters: [movieExists, asyncErrorBoundary(readTheaters)],
  readReviews: [movieExists, asyncErrorBoundary(readReviews)]
};

//how do i join information from several tables into 1

//i know i select a table with knex
//then join tables using shared values
//then select what i want from tables?
//does it look like select('theaters.*', 'movies_theaters.is_showing', movieId)