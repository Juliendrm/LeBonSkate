const { Schema, model } = require("mongoose");

const wheelsSchema = new Schema({
  brand: {type: Schema.Types.String,
    required: true},
  color: {type: Schema.Types.String,
    required: true},
  abec: {
    type: Schema.Types.Number,
    enum: [1, 3, 5, 7, 9, 11],
    required: true
  },
  seller: {type: Schema.Types.ObjectId,
      required: [true, "you must be logged in"],
    }
});

const Wheels = model("Wheels", wheelsSchema);

module.exports = Wheels;
