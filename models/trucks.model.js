const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
  brand: String,
  color: String,
});

const Trucks = model("Trucks", truckSchema);

module.exports = Trucks;
