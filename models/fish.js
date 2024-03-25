// importing the mongoose.
const mongoose = require("mongoose"); 
// 

const schema = mongoose.Schema;

const fishSchema = new schema({
    fishName:{
        type:String,
        unique: true,
        required:true
    }
});

// creating the collection.
const Fish = mongoose.model("Fish",fishSchema);
// 

// exporting the collection so that we use in our app.js
module.exports = Fish;
// 
