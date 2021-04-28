const mongoose = require("mongoose");

//Import schema object
const Schema = mongoose.Schema;

//Create a new instance of the schema object
const blogSchema = Schema({
    //Create properties that we want to have
    title: {
        type: String,
        required: true //Specified that this field is required
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true }); //We can pass in the second argument "constructor"
//Timestamps will automatically genereates timestamp everytime when we update or create

//Create model, the first argument is the name of the collection, and the second is the schema
const Blog = mongoose.model("Blog", blogSchema); //It'll look for "blogs" automatically when connect

//Export the model to be use
module.exports = Blog;