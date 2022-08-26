const { Schema, model } = require("mongoose");
// const Board = require("../models/board.model"); // importing Board model;
// const Truck = require("../models/trucks.model"); // Importing Truck model;
// const Wheels = require("../models/wheels.model"); // Importing Wheels;

const skateboardSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  trucks: {
    type: Schema.Types.ObjectId,
    ref: "Trucks",
  },
  wheels: {
    type: Schema.Types.ObjectId,
    ref: "Wheels",
  },
});

const Skateboard = model("Skateboard", skateboardSchema);

module.exports = Skateboard;
// module.exports = Board;
// module.exports = Truck;
// module.exports = Wheels;
