const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
  brand: {type: Schema.Types.String,
    required: [true, "please provide trucks brand name"]},
  color: {type: Schema.Types.String,
    required: [true, "please provide trucks color"]},
    seller: {type: Schema.Types.ObjectId,
      required: [true, "you must be logged in"],
    }
});

const Trucks = model("Trucks", truckSchema);

module.exports = Trucks;
