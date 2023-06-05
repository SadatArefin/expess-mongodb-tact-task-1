module.exports = (mongoose) => {
  const purchaseDetailsSchema = mongoose.Schema(
    {
      purchaseId: String,
      medicineId: String,
      unit: String,
      batchNo: String,
      quantity: Number,
      price: Number,
      discount: Number,
      total: Number,
    },
    { timestamps: true }
  );
  purchaseDetailsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const PurchaseDetails = mongoose.model(
    "purchaseDetails",
    purchaseDetailsSchema
  );
  return PurchaseDetails;
};
