module.exports = (mongoose) => {
  const purchaseSchema = mongoose.Schema(
    {
      purchaseNo: Number,
      purchaseDate: Date,
      supplier: String,
      notes: String,
      subTotal: Number,
      discount: Number,
      paymentMethod: String,
    },
    { timestamps: true }
  );
  purchaseSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Purchase = mongoose.model("purchase", purchaseSchema);

  return Purchase;
};
