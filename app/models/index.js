const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.purchases = require("./purchase.model.js")(mongoose);
db.medicines = require("./medicine.model.js")(mongoose);
db.purchaseDetails = require("./purchaseDetails.model.js")(mongoose);

module.exports = db;
