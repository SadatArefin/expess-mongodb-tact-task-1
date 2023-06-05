module.exports = (app) => {
  const medicines = require("../controllers/medicine.controller.js");

  var router = require("express").Router();

  //create new medicine
  router.post("/", medicines.create);

  //retrieve all medicines
  router.get("/", medicines.findAll);

  //retrieve a single medicine with id
  router.get("/:id", medicines.findOne);

  //update a medicine with id
  router.put("/:id", medicines.update);

  //delete a medicine with id
  router.delete("/:id", medicines.delete);

  //delete all medicines
  router.delete("/", medicines.deleteAll);

  app.use("/api/medicines", router);
};
