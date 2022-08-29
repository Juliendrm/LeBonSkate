const router = require("express").Router();
const Board = require("../models/board.model");

// seller sell wheels with that.
router.post("/", async (req, res, next) => {
  try {
    const { brand, color, size } = req.body;
    const newBoard = await Board.create({
      brand: brand,
      color: color,
      size: size,
    });
    console.log(newBoard);
    res.status(201).json(newBoard);
  } catch {
    res.status(400);
  }
});

// allow the buyer to find the wheels he wants.
router.get("/", async (req, res, next) => {
  console.log(`test`);
  try {
    const boardsFound = await Board.find();
    res.status(201).json(boardsFound);
  } catch {
    res.status(400);
  }
});

module.exports = router;