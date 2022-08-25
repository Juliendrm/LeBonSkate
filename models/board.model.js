const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const boardSchema = new Schema({
  brand: {
    type: String,
    unique: true,
  },
  color: String,
  size: Number,
});

const Board = model("Board", boardSchema);

module.exports = Board;
