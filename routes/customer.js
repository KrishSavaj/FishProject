const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customer");
const wrapAsync = require("../utils/wrapAsync");

// this are the renderring new form and adding new customer data to datebase request path.
router
  .route("/")
  .get(CustomerController.renderAddForm)
  .post(wrapAsync(CustomerController.addCustomer));

router.route("/show").get(wrapAsync(CustomerController.showCustomer));

router
  .route("/:id")
  .put(wrapAsync(CustomerController.editCustomer))
  .delete(wrapAsync(CustomerController.deleteCustomer));

router.route("/:id/edit").get(wrapAsync(CustomerController.renderEditForm));

module.exports = router;
