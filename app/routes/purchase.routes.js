module.exports = (app) => {
  const purchases = require("../controllers/purchase.controller.js");

  var router = require("express").Router();

  //create new purchase
  router.post("/", purchases.create);

  //retrieve all purchases
  router.get("/", purchases.findAll);

  //retrieve a single purchase with id
  router.get("/:id", purchases.findOne);

  //retrieve all purchases
  router.get("/purchases", purchases.findAllPurchase);

  //update a purchase with id
  router.put("/:id", purchases.update);

  //delete a purchase with id
  router.delete("/:id", purchases.delete);

  //delete all purchases
  router.delete("/", purchases.deleteAll);

  app.use("/api/purchases", router);
};
