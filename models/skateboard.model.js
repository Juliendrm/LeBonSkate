const { Schema, model } = require("mongoose");
// const Board = require("../models/board.model"); // importing Board model;
// const Truck = require("../models/trucks.model"); // Importing Truck model;
// const Wheels = require("../models/wheels.model"); // Importing Wheels;

const skateboardSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: [true, "deck is required to build a board"],
  },
  trucks: {
    type: Schema.Types.ObjectId,
    ref: "Trucks",
    required: [true, "trucks are required to build a board"]
  },
  wheels: {
    type: Schema.Types.ObjectId,
    ref: "Wheels",
    required: [true, "wheels are required to build a board"]
  },
  seller: {type: Schema.Types.ObjectId,
    required: [true, "you must be logged in"],
  },
  sold: {
    type: "boolean",
    default: false,
  },
});

const Skateboard = model("Skateboard", skateboardSchema);

module.exports = Skateboard;
