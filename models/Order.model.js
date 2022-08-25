const { Schema, model } = require("mongoose");
const User = require("../models/User.model");

const orderModel = new Schema({
  approved: {
    type: "boolean",
    default: false,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  skateBoard: {
    type: Schema.Types.ObjectId,
    ref: "Skateboard",
  },
  timeStamps: true,
});

const Order = model("Oder", orderModel);

module.exports = Order;

//sdsdds
