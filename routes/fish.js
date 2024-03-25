const express = require("express");
const router = express.Router();

const FishController = require("../controllers/fish");
const wrapAsync = require("../utils/wrapAsync");

// this are the renderring new form and adding new fish data to datebase request path.
router
  .route("/")
  .get(FishController.renderAddForm)
  .post(wrapAsync(FishController.addFish));

router.route("/show").get(wrapAsync(FishController.showFish));

router
  .route("/:id")
  .put(wrapAsync(FishController.editFish))
  .delete(wrapAsync(FishController.deleteFish));

router.route("/:id/edit").get(wrapAsync(FishController.renderEditForm));

module.exports = router;
