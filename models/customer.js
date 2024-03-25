// importing the mongoose.
const mongoose = require("mongoose"); 
// 

const schema = mongoose.Schema;

const customerSchema = new schema({
    customerName:{
        type:String,
        unique: true,
        required:true
    },
    mobileNumber:{
        type:String,
        unique: true,
        required:true
    },
    credit:{
        type:Number,
        default:0
    },
});

// creating the collection.
const Customer = mongoose.model("Customer",customerSchema);
// 

// exporting the collection so that we use in our app.js
module.exports = Customer;
// 