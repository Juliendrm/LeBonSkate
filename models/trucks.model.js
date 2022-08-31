const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
  brand: {type: Schema.Types.String,
    required: [true, "please provide trucks brand name"]},
  color: {type: Schema.Types.String,
    required: [true, "please provide trucks color"]},
    seller: {type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "you must be logged in"],
    },
    sold: {
      type: "boolean",
      default: false,
    },
});

const Trucks = model("Trucks", truckSchema);

module.exports = Trucks;
