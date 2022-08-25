const { Schema, model } = require("mongoose");
const Board = require("../models/board.model"); // importing Board model;
const Truck = require("../models/truck.model"); // Importing Truck model;
const Wheels = require("../models/wheels.model"); // Importing Wheels;

const skateboardSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  truck: {
    type: Schema.Types.ObjectId,
    ref: "Truck",
  },
  wheels: {
    type: Schema.Types.ObjectId,
    ref: "Wheels",
  },
  timestamp: true,
});

const Skateboard = model("Skateboard", skateboardSchema);

module.exports = Skateboard;
module.exports = Board;
module.exports = Truck;
module.exports = Wheels;
