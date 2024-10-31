const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchrma = new Schema(
  {
    productimages: {
      type: [String],
    },
    productName: {
      type: String,
      required: true,
    },
    productprice: {
      type: Number,
      required: true,
    },
    productdescription: {
      type: String,
    },
    age: {
      type: String,
    },
    language: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchrma);
