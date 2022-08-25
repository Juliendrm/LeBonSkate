const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
  board: String,
  color: String,
});

const Truck = model("Truck", truckSchema);

module.exports = Truck;
