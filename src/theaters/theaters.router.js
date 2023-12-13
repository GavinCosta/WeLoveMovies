const router = require("express").Router({mergeParams: true})
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//get theaters route (no other theater routes)
router.route("/") 
        //get list is the only http method
        .get(controller.list)
        .all(methodNotAllowed)


        module.exports = router

//NOTES
//All you need to do is return a list of theaters including the movies being shown

//This should likely look like a list function that joins theaters with movies where movies is_shown through the movies_theaters table
//This means its a double join that will likely include movie, theater, and is shown properties