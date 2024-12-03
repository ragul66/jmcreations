const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
