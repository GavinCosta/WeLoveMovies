const router = require("express").Router({mergeParams: true})
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//set up reviews path - appears to only have a reviews/reviewId path (not sure if we should just set as base url in app)
router.route("/")
        .get(controller.list)
        .all(methodNotAllowed)

router.route("/:reviewId")
            //put request (TBD)
            .put(controller.update)
            //delete request (TBD)
            .delete(controller.delete)
            //error for using any nondefined methods
            .all(methodNotAllowed)

module.exports = router