const router = require("express").Router({mergeParams: true})
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//get theaters route (no other theater routes)
router.route("/") 
        //get list is the only http method
        .get(controller.list)
        .all(methodNotAllowed)


        module.exports = router