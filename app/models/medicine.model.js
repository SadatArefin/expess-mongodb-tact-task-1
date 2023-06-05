module.exports = (mongoose) => {
  const medicineSchema = mongoose.Schema(
    {
      medicineName: String,
      category: String,
    },
    { timestamps: true }
  );
  medicineSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Medicine = mongoose.model("medicine", medicineSchema);
  return Medicine;
};
