// importing the express.
const express = require("express");
const app = express();
//

// setting the path for the views.
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//

// for reading the data from the request you do this encoding.
app.use(express.urlencoded({ extended: true }));
//

// for a form to send a post request and convert that reques into put this method override package is use.
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
//

// importing the mongoose.
const mongoose = require("mongoose");
//

// creating connection to database.
const mongo = "mongodb://127.0.0.1:27017/FishShop";

main()
  .then((res) => {
    console.log("Connected to Data-Base");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo);
}
//

// importing the ExpressError class.
const ExpressError = require("./utils/ExpressError.js");
//

const SuplierRouter = require("./routes/suplier.js");

const CustomerRouter = require("./routes/customer.js");

const FishRouter = require("./routes/fish.js");

const CashCounterRouter = require("./routes/cash_counter.js");

const PayPendingRouter = require("./routes/pay_pending.js");

const SuplierEntryRouter = require("./routes/suplier_entry.js");

const BillingRouter = require("./routes/billing.js");

// root or home page
app.get("/", (req, res) => {
  res.send("hi,i am root");
});
//

app.use("/suplier", SuplierRouter);

app.use("/customer", CustomerRouter);

app.use("/fish", FishRouter);

app.use("/cashcounter", CashCounterRouter);

app.use("/paypending", PayPendingRouter);

app.use("/suplierentry", SuplierEntryRouter);

app.use("/billing", BillingRouter);

// for page not found error.
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
//

// error handlign middleware.
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;
  // res.status(statusCode).render("./listings/error.ejs",{message});
  res.status(statusCode).send(message);
});
//

// server listening port.
app.listen(8080, () => {
  console.log("Server is Listening to Port 8080");
});
//
