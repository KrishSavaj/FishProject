const express = require("express");
const router = express.Router();

const PayPending = require("../controllers/pay_pending");
const wrapAsync = require("../utils/wrapAsync");

// this is renderring new form for paypending and update request path.
router
  .route("/")
  .get(PayPending.renderAddForm)
  .post(wrapAsync(PayPending.updateEntry));

router.route("/show").get(wrapAsync(PayPending.showPayPending));

router
  .route("/:id")
  .put(wrapAsync(PayPending.editPayPending))
  .delete(wrapAsync(PayPending.deletePayPending));

router.route("/:id/edit").get(wrapAsync(PayPending.renderEditForm));

module.exports = router;
