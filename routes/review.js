const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn} = require("../middlewar.js");

const reviewController = require("../controllers/reviews.js")

//Reviews 
//Post Route
router.post("/",isLoggedIn ,validateReview, wrapAsync (reviewController.createReview))



//Delete Re Route
router.delete(
    ":reviewId",
    isLoggedIn ,
    wrapAsync(reviewController.DeleteReview)
)


module.exports = router