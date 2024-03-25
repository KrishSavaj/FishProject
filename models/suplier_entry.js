// importing the mongoose.
const mongoose = require("mongoose");
//

const schema = mongoose.Schema;

const suplier_entry = new schema({
  date: {
    type: String,
    required: true,
  },
  suplierId: {
    type: schema.Types.ObjectId,
    ref: "Suplier",
  },
  boxes: {
    type: Number,
    required: true,
  },
  pieces: {
    type: Number,
    required: true,
  },
});

// creating the collection.
const Suplier_Entry = mongoose.model("Suplier_Entry", suplier_entry);
//

// exporting the collection so that we use in our app.js
module.exports = Suplier_Entry;
//
