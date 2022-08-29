const { Schema, model, Types } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const boardSchema = new Schema({
  brand: {
    type: Schema.Types.String,
    required: [true, "please provide a board brand"],
  },
  color: {
    type: Schema.Types.String,
    required: [true, "please provide the board color"],
  },
  size: {
    type: Schema.Types.Number,
    enum: {
      values: [7, 7.24, 7.4, 7.5, 7.75, 8, 8.25, 8.5, 8.75],
      message: "please provide an accepted deck size",
    },
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    required: [true, "you must be logged in"],
    ref: "User",
  },
});

const Board = model("Board", boardSchema);

module.exports = Board;
