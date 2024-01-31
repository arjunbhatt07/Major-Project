const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title : {
     type: String,
     required: true,
    },
    description: String, 
    Image : {
        type: String,
        default: "https://unsplash.com/photos/a-body-of-water-with-a-wave-coming-in-p9Aef2P9hv0",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-body-of-water-with-a-wave-coming-in-p9Aef2P9hv0" : v,
       }, 
    price: Number,
    location: String,
    country: String,
}); 

const Listing = mongoose.model("Listing" , listingSchema)
module.exports = Listing;