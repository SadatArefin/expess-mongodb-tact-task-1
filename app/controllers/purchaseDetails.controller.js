const db = require("../models");
const PurchaseDetail = db.purchaseDetails;

//create and save new purchaseDetail
exports.create = (req, res) => {
  //validate request
  if (!req.body.purchase) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  //create purchaseDetail
  const purchaseDetail = new PurchaseDetail({
    purchase: req.body.purchase,
    medicine: req.body.medicine,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    discount: req.body.discount,
  });

  //save purchaseDetail in the database
  purchaseDetail
    .save(purchaseDetail)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message ||
          "Some error occured while creating the purchaseDetail.",
      });
    });
};

//retrieve all purchaseDetails from the database
exports.findAll = (req, res) => {
  const purchase = req.query.purchase;
  var condition = purchase
    ? { purchase: { $regex: new RegExp(purchase), $options: "i" } }
    : {};

  PurchaseDetail.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving purchaseDetails.",
      });
    });
};

//find a single purchaseDetail with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PurchaseDetail.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found purchaseDetail with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving purchaseDetail with id=" + id });
    });
};

//update a purchaseDetail by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;

  PurchaseDetail.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update purchaseDetail with id=${id}. Maybe purchaseDetail was not found!`,
        });
      } else res.send({ message: "purchaseDetail was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating purchaseDetail with id=" + id,
      });
    });
};

//delete a purchaseDetail with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PurchaseDetail.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete purchaseDetail with id=${id}. Maybe purchaseDetail was not found!`,
        });
      } else {
        res.send({
          message: "purchaseDetail was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete purchaseDetail with id=" + id,
      });
    });
};

//delete all purchaseDetails from the database
exports.deleteAll = (req, res) => {
  PurchaseDetail.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} purchaseDetails were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while removing all purchaseDetails.",
      });
    });
};

//find all purchaseDetails with a purchase id
exports.findAllByPurchase = (req, res) => {
  const purchase = req.params.purchase;

  PurchaseDetail.find({ purchase: purchase })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({
            message: "Not found purchaseDetail with purchase " + purchase,
          });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: "Error retrieving purchaseDetail with purchase=" + purchase,
        });
    });
};
