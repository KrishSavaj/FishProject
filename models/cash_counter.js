// importing the mongoose.
const mongoose = require("mongoose");
//

const schema = mongoose.Schema;

const cashCounterSchema = new schema({
  date: {
    type: String,
    required: true,
  },
  suplierId: {
    type: schema.Types.ObjectId,
    ref: "Suplier",
  },
  customerId: {
    type: schema.Types.ObjectId,
    ref: "Customer",
  },
  subName: {
    type: String,
  },
  fishId: {
    type: schema.Types.ObjectId,
    ref: "Fish",
  },
  kg: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// creating the collection.
const CashCounter = mongoose.model("CashCounter", cashCounterSchema);
//

// exporting the collection so that we use in our app.js
module.exports = CashCounter;
//
