const express = require("express");
const router = express.Router();

const SuplierEntryController = require("../controllers/suplier_entry");

const wrapAsync = require("../utils/wrapAsync");

router
  .route("/")
  .get(SuplierEntryController.renderAddForm)
  .post(wrapAsync(SuplierEntryController.addEntry));

router.route("/show").get(wrapAsync(SuplierEntryController.showEntry));

router
  .route("/:id")
  .put(wrapAsync(SuplierEntryController.editSuplierEntry))
  .delete(wrapAsync(SuplierEntryController.deleteEntry));

router.route("/:id/edit").get(wrapAsync(SuplierEntryController.renderEditForm));

module.exports = router;
