const router = require("express").Router();
const Trucks = require("../models/trucks.model");
const Board = require("../models/board.model");
const Wheels = require("../models/wheels.model");
const Skateboard = require("../models/skateboard.model");

router.post("/", async (req, res, next) => {
  try {
    const { board, trucks, wheels } = req.body;
    // const boardToBuild = await Board.findById(board);
    // const trucksToBuild = await Trucks.findById(trucks);
    // const wheelsToBuild = await Wheels.findById(wheels);

    const newSkateboard = await Skateboard.create({
      board: board,
      trucks: trucks,
      wheels: wheels,
    });

    res.status(201).json(await newSkateboard.populate("trucks board wheels"));
  } catch {
    res.status(400);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const skateboardFound = await Skateboard.find();
    res.status(201).json(skateboardFound);
  } catch {
    res.status(400);
  }
});

module.exports = router;
