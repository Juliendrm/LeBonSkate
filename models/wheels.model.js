const { Schema, model } = require("mongoose");

const wheelsSchema = new Schema({
  brand: String,
  color: String,
  abec: Number,
  size: Number,
});

const Wheels = model("Wheels", wheelsSchema);

module.exports = Wheels;
