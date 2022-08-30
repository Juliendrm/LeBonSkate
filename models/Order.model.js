const { Schema, model } = require("mongoose");
const User = require("../models/User.model");

const orderModel = new Schema(
  {
    approved: {
      type: "boolean",
      default: false,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "must be logged in"],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    skateBoard: {
      type: Schema.Types.ObjectId,
      ref: "Skateboard",
    },
    trucks: {
      type: Schema.Types.ObjectId,
      ref: "Trucks",
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    wheels: {
      type: Schema.Types.ObjectId,
      ref: "Wheels",
    },
  },
  { timeStamps: true }
);

const Order = model("Order", orderModel);

module.exports = Order;
