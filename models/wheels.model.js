const { Schema, model } = require("mongoose");

const wheelsSchema = new Schema({
  brand: String,
  color: String,
  abec: {
    type: Schema.Types.Number,
    enum: [1, 3, 5, 7, 9, 11],
  },
  size: Number,
});

const Wheels = model("Wheels", wheelsSchema);

module.exports = Wheels;
