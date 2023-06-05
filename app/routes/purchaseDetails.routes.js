module.exports = (app) => {
    const purchaseDetails = require("../controllers/purchaseDetail.controller.js");

    var router = require("express").Router();

    //create new purchaseDetail
    router.post("/", purchaseDetails.create);

    //retrieve all purchaseDetails
    router.get("/", purchaseDetails.findAll);

    //retrieve a single purchaseDetail with id
    router.get("/:id", purchaseDetails.findOne);

    // retrieve all purchaseDetails with purchaseId
    router.get("/purchase/:purchaseId", purchaseDetails.findAllByPurchase);
    
    //update a purchaseDetail with id
    router.put("/:id", purchaseDetails.update);

    //delete a purchaseDetail with id
    router.delete("/:id", purchaseDetails.delete);

    //delete all purchaseDetails
    router.delete("/", purchaseDetails.deleteAll);

    app.use("/api/purchaseDetails", router);
};
