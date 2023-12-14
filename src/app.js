if (process.env.USER) require("dotenv").config();
const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors")
const theaterRouter = require("./theaters/theaters.router")
const reviewsRouter = require('./reviews/reviews.router')
const moviesRouter = require('./movies/movies.router')
const notFound = require("./errors/notFound")
const errorHandler = require('./errors/errorHandler')
//use cors to allow specific methods
app.use(cors())
app.use(express.json())
//set routes - movies, reviews, and theaters
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theaterRouter)
//error handlers - not found / errors out
app.use(notFound)
app.use(errorHandler)
module.exports = app;
