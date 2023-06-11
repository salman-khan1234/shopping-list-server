const express = require("express");
const controllers = require("../controllers/shopping-controller");
const router = express.Router();

router
  .route("/shopping-list")
  .get(controllers.getAllItems)
  .post(controllers.createItem);

router
  .route("/shopping-list/:id")
  .put(controllers.updateItem)
  .delete(controllers.deleteItem);

module.exports = router;
