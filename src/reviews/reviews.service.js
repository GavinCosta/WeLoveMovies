const knex = require("../db/connection")

//define tableName to use variable for modularization / easy editing
const tableName = "reviews"

//modify this function to get critics for review 
async function readReviews(reviewId) {
    //return a db query that connects reviews critics and movies
    return knex('reviews')
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
            .where({'reviews.review_id': reviewId }).first()
            .then((data) => {
                return {
                    'content': data.content,
                    'created_at': data.created_at,
                    'critic': {
                        'organization_name': data.organization_name,
                        'preferred_name': data.preferred_name,
                        'surname': data.surname,
                        "created_at": data.critic_created_at,
                        "updated_at": data.critic_updated_at
                    },
                    'critic_id': data.critic_id,
                    'movie_id': data.movie_id,
                    'review_id': data.review_id,
                    'score': data.score,
                    'updated_at': data.updated_at
                }
            })
}

//return {    
    //     'review_id': data.reviewId,
    //     'content': data.content,
    //     'score': data.score,
    //     'created_at': data.created_at, 
    //     'updated_at': data.updated_at,
    //     'movie_id': data.movie_id,
    //     'critic_id': data.critic_id,
    //     'critic': {
    //         'critic_id': data.critic_id,
    //         'preferred_name': data.preferred_name,
    //         'surname': data.surname,
    //         'organization_name': data.organization_name,
    //         'created_at': data.critic_created_at,
    //         'updated_at': data.critic_updated_at
    //     },                   
    // }


//list function
function list() {
    return knex(tableName).select("*")
}

//read function
async function read(reviewId) {
    return knex(tableName).select("*").where({review_id: reviewId }).first()
}

//update function
function update(updatedReview) {
    return knex(tableName).select("*").where({review_id: updatedReview.review_id}).update(updatedReview).then(() => readReviews(updatedReview.review_id))
}

//delete function
function destroy(reviewId) {
    return knex(tableName).where({review_id: reviewId }).del()

}

module.exports = {
    list,
    read,
    update,
    destroy
}