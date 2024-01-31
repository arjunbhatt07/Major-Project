const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" ,"ejs" );
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/" , (req , res) => {
    res.send("hi , i am root");
});

//index Route

app.get("/Listings" , async (req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
});

//New Route
app.get("/listings/new" , (req , res) =>{
    res.render("listings/new.ejs");
});


//show Route
app.get("/listings/:id" , async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/show.ejs" , {listing});
});

//create route
app.post("/listings" , async (req , res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit Route
app.get("/listings/:id/edit" , async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
 res.render("listings/edit.ejs" , {listing});
});

//Update Route
app.put("/listings/:id" , async (req , res) => {
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id , { ...req.body.listing})
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id" , async (req , res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})


// app.get("/testListing" , async (req , res) => {
//     let sampleListing = new Listing({
//         title: "My New Place",
//         description : "My Dream",
//         price : 1200,
//         location : "maldiees",
//         country : "india",
//     })
//     await sampleListing.save();
//     console.log("sample was done");
//     res.send("sucessfull test")
// });


app.listen(8080 , () => {
    console.log("serer is listing the port 8080");
}); 