// importing the mongoose.
const mongoose = require("mongoose");
//

const schema = mongoose.Schema;

const suplierSchema = new schema({
  suplierName: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNum:{
      type:Number,
  },
  sales: {
    type: Number,
    default: 0,
  },
});

// creating the collection.
const Suplier = mongoose.model("Suplier", suplierSchema);
//

// exporting the collection so that we use in our app.js
module.exports = Suplier;
//
