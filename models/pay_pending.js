// importing the mongoose.
const mongoose = require("mongoose");
//

const schema = mongoose.Schema;

const PayPendingSchema = new schema({
  date: {
    type: String,
    required: true,
  },
  customerId: {
    type: schema.Types.ObjectId,
    ref: "Customer",
  },
  amount: {
    type: Number,
    require: true,
  },
});

// creating the collection.
const PayPending = mongoose.model("PayPending", PayPendingSchema);
//

// exporting the collection so that we use in our app.js
module.exports = PayPending;
//
