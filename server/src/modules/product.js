const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchrma = new Schema(
  {
    productimages: {
      type: [String],
    },
    productName: {
      type: String,
    },
    productcategory: {
      type: String,
    },
    productsubcategory: {
      type: String,
    },
    productprice: {
      type: Number,
    },
    stock: {
      type: Number,
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
    publication: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchrma);
