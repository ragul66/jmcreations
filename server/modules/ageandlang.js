const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ageandlang = new Schema({
  age: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
});
