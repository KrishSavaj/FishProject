const express = require("express");
const router = express.Router();

const SuplierController = require("../controllers/suplier.js");

const wrapAsync = require("../utils/wrapAsync.js");

// this are the renderring new form and adding new suplier data to datebase request path.
router
  .route("/")
  .get(SuplierController.renderAddForm)
  .post(wrapAsync(SuplierController.addSuplier));

router.route("/show").get(wrapAsync(SuplierController.showSuplier));

router
  .route("/:id")
  .delete(wrapAsync(SuplierController.deleteSuplier))
  .put(wrapAsync(SuplierController.editSuplier));

router.route("/:id/edit").get(wrapAsync(SuplierController.renderEditForm));

module.exports = router;
