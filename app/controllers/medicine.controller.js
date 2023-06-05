const db = require("../models");
const Medicine = db.medicines;

//create and save new medicine
exports.create = (req, res) => {
    //validate request
    if (!req.body.medicineName) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    
    //create medicine
    const medicine = new Medicine({
        medicineName: req.body.medicineName,
        category: req.body.category,
    });
    
    //save medicine in the database
    medicine
        .save(medicine)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(400).send({
            message:
            err.message || "Some error occured while creating the medicine.",
        });
        });
}
    
//retrieve all medicines from the database
exports.findAll = (req, res) => {
    const medicineName = req.query.medicineName;
    var condition = medicineName
        ? { medicineName: { $regex: new RegExp(medicineName), $options: "i" } }
        : {};
    
    Medicine.find(condition)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving medicines.",
        });
        });
}

//find a single medicine with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Medicine.findById(id)
        .then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found medicine with id " + id });
        else res.send(data);
        })
        .catch((err) => {
        res.status(500).send({ message: "Error retrieving medicine with id=" + id });
        });
}

//update a medicine by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update cannot be empty!",
        });
    }

    const id = req.params.id;

    Medicine.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update medicine with id=${id}. Maybe medicine was not found!`,
            });
        } else res.send({ message: "Medicine was updated successfully." });
        }
    )
        .catch((err) => {
        res.status(500).send({
            message: "Error updating medicine with id=" + id,
        });
        }
    );
}

//delete a medicine with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Medicine.findByIdAndRemove(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete medicine with id=${id}. Maybe medicine was not found!`,
            });
        } else {
            res.send({
            message: "Medicine was deleted successfully!",
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete medicine with id=" + id,
        });
        });
}

//delete all medicines from the database
exports.deleteAll = (req, res) => {
    Medicine.deleteMany({})
        .then((data) => {
        res.send({
            message: `${data.deletedCount} medicines were deleted successfully!`,
        });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while removing all medicines.",
        });
        });
}

//find all catalogued medicines
exports.findAllCatalogued = (req, res) => {
    Medicine.find({ category: "catalogued" })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving medicines.",
        });
        });
}
