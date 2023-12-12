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


module.exports = {
    listShowing,
    list,
    read
}