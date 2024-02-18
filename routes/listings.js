const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing } = require("../middlewar.js");
const { Cursor } = require("mongoose");

const listingController = require("../controllers/listings.js");

//index Route

router.get("/" , wrapAsync(listingController.index)
);

//New Route
router.get("/new" , isLoggedIn , listingController.renderNewForm);


//show Route
router.get("/:id" ,wrapAsync(listingController.showListing));

//create route
router.post("/" , isLoggedIn ,
 validateListing,
 wrapAsync(listingController.createListing)
);

//Edit Route
router.get("/:id/edit" ,isLoggedIn , isOwner ,wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put("/:id" , isLoggedIn , isOwner ,
validateListing,
wrapAsync(listingController.renderUpdate));

//Delete Route
router.delete("/:id" , isLoggedIn , isOwner ,wrapAsync(listingController.renderDeleteForm));


module.exports = router;