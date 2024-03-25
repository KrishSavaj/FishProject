const mongoose = require("mongoose");

const Suplier = require("../models/suplier.js");

const CashCounter = require("../models/cash_counter.js");

// creating connection to database.
const mongo = "mongodb://127.0.0.1:27017/FishShop";

main()
  .then((res) => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo);
}

// it is added because adding column sales at an end...
// async function suplier() {
//   const cash_counter = await CashCounter.find();

//   for (entry of cash_counter) {
//     await Suplier.findByIdAndUpdate(entry.suplierId, {
//       $inc: { sales: entry.amount },
//     });
//   }
// }

// suplier();
//
