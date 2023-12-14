const knex = require("../db/connection")
const reduceProperties = require('../utils/reduce-properties')
//define tableName to use variable for modularization / easy editing
// const tableName = "theaters"

//reduce properties
const reduceMovies = reduceProperties('theater_id', {
    movie_id: ['movies', null, 'movie_id'], 
    title: ['movies', null, 'title'],
    runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
    rating: ['movies', null, 'rating'],
    description: ['movies', null, 'description'],
    image_url: ['movies', null, 'image_url'],   
})

//write reduce by hand for exercise / use js to write reduce function

async function list() {
    return knex('theaters')
            .join('movies_theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
            .join('movies', 'movies.movie_id', 'movies_theaters.movie_id')
            .then(reduceMovies)
}
module.exports = {
    list
}
