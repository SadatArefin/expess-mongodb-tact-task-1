const db = require("../models");
const Purchase = db.purchase;

//create and save new purchase
exports.create = (req, res) => {
  //validate request
  if (!req.body.purchaseNo) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  //create purchase
  const purchase = new Purchase({
    purchaseNo: req.body.purchaseNo,
    purchaseDate: req.body.purchaseDate,
    supplier: req.body.supplier,
    notes: req.body.notes,
    subTotal: req.body.subTotal,
    discount: req.body.discount,
    paymentMethod: req.body.paymentMethod,
  });

  //save purchase in the database
  purchase
    .save(purchase)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || "Some error occured while creating the purchase.",
      });
    });
};

//retrieve all purchases from the database
exports.findAll = (req, res) => {
  const purchaseNo = req.query.purchaseNo;
  var condition = purchaseNo
    ? { purchaseNo: { $regex: new RegExp(purchaseNo), $options: "i" } }
    : {};

  Purchase.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving purchases.",
      });
    });
};

//find a single purchase with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Purchase.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found purchase with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving purchase with id " + id });
    });
};

//update a purchase by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    });
  }

  const id = req.params.id;

  Purchase.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update purchase with id=${id}. Maybe purchase was not found!`,
        });
      } else res.send({ message: "Purchase was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating purchase with id=" + id,
      });
    });
};

//delete a purchase with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Purchase.findByIdAndRemove(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete purchase with id=${id}. Maybe purchase was not found!`,
            });
        } else {
            res.send({
            message: "Purchase was deleted successfully!",
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete purchase with id=" + id,
        });
        });
}
    
//delete all purchases from the database
exports.deleteAll = (req, res) => {
    Purchase.deleteMany({})
        .then((data) => {
        res.send({
            message: `${data.deletedCount} purchases were deleted successfully!`,
        });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while removing all purchases.",
        });
        });
}

//find all published purchases
exports.findAllPurchase = (req, res) => {
    Purchase.find({ published: true })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving purchases.",
        });
        });
}