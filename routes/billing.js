const express = require("express");
const router = express.Router();

const BillingController = require("../controllers/billing");

const WrapAsync = require("../utils/WrapAsync.js");

router.route("/").get(WrapAsync(BillingController.generateBill));

module.exports = router;
