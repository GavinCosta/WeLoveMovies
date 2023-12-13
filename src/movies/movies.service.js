const knex = require('../db/connection')

//should return movies if is_showing = true is provided in url
async function listShowing() {
    const query = knex('movies')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .select('movies.*')
    .where({'movies_theaters.is_showing': true})
    .groupBy('movies.movie_id')
    //to get is_showing i must access movies_theaters table
    // const query = knex('movies_theaters')
    //     .join('movies', 'movies_theaters.movie_id', 'movies.movie_id')
    //     .select('movies.*')
    // console.log("LISTSHOWING -------------",query)
    //my logic is to create is_showing=true path then create a listShowing function that takes in said table from knex
    //then after selecting where is_showing = true send that list to connection where we await then res then add to router?
    return query
}

//list everything and list when showing is true
//thought: run conditional if isShowing query filter isShowing = true
async function list() {
    return knex('movies').select('*'); 
  }

async function read(movieId) {
        return knex('movies').select('*').where({movie_id: movieId}).first()
}

//read theaters - get back an obj with theater values where movie_id and is showing = true
//if is showing === true then join select and group
//read movie by id, join by movie id then join by theater id

//make new read to get theater where movieId = movie_theater.movie_id 
async function readTheaters(movieId) {
    return knex('movies')
            .join('movies_theaters', 'movies_theaters.movie_id', 'movies.movie_id')
            .join('theaters', 'movies_theaters.theater_id', 'theaters.theater_id')
            .select('theaters.*', 'movies_theaters.is_showing', 'movies.movie_id')
            .where({'movies.movie_id': movieId, 'movies_theaters.is_showing': true})
            // .groupBy('theaters.theater_id') -- dont need groupBy because through joining we dont have duplicates
}
//need to edit to ensure is_showing = true

async function readReviews(movieId) {
    //return a db query that connects reviews critics and movies
    return knex('movies')
    //get reviews for a given movieId
            .join('reviews', 'movies.movie_id', 'reviews.movie_id')
            //join critics with critic id
            .join('critics', 'reviews.critic_id', 'critics.critic_id')
            //select reviews info and alias critics info
            .select(   'reviews.review_id',
            'reviews.content',
            'reviews.score',
            'reviews.created_at',
            'reviews.updated_at',
            'reviews.critic_id',
            'reviews.movie_id',
            'critics.critic_id',
            'critics.preferred_name',
            'critics.surname',
            'critics.organization_name',
            'critics.created_at as critic_created_at',
            'critics.updated_at as critic_updated_at')
            //get reviews for given movieId
            .where({'reviews.movie_id': movieId })
}

module.exports = {
    readReviews,
    readTheaters,
    listShowing,
    list,
    read
}