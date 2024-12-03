const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    subCategory: {
      type: [String],
      required: true,
    },
    age: {
      type: [String],
      required: true,
    },
    language: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
