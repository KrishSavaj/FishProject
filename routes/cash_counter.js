const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const CashCounterController = require("../controllers/cash_counter");

// this are the renderring new form and adding new cashcounter entry data to datebase request path.
router
  .route("/")
  .get(CashCounterController.renderAddForm)
  .post(wrapAsync(CashCounterController.AddEntry));

router.route("/show").get(wrapAsync(CashCounterController.showCashCounter));

router
  .route("/:id")
  .put(wrapAsync(CashCounterController.editEntry))
  .delete(wrapAsync(CashCounterController.deleteEntry));

router.route("/:id/edit").get(wrapAsync(CashCounterController.renderEditForm));

module.exports = router;
