const express = require("express");
const router = express.Router();

//posts

// const router = require("./posts");

//index 
router.get("/" , (req , res) => {
    res.send("Get for posts");
})

//get 
router.get("/:id" , (req , res) => {
    res.send("Get for posts id");
})

//post 
router.post("/" , (req , res) => {
    res.send("Post for posts");
})

//delete 
router.delete("/:id" , (req , res) => {
    res.send("Post for posts id");
})


module.exports = router;