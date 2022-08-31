const router = require("express").Router();
const isAuth = require("../middleware/middleware");
const Order = require("../models/Order.model");

router.get("/sell", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id }).populate(
        "buyer",
        "-password"
      );
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/buy", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/sell/id:", isAuth, async (req, res) => {
    try {
        const approvedOrder = await Order.findOneAndUpdate({ seller: req.params.id }, { approved : true });
        res.status(200).json(approvedOrder);
      } catch (error) {
        res.status(400).send(error.message);
      }
})

module.exports = router;
