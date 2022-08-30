require("dotenv/config")
require("../db/index")

const Trucks = require("../models/trucks.model")
const User = require("../models/User.model")
const getRandomId = require("../utils/utils")

const trucksSeeds = [
    {brand: "Thunder Truck Co",
    color: "Silver"},
    { brand: "Venture",
    color: "Silver"},
    { brand: "Independent",
    color: "Silver"},
    { brand: "Theeve Titanium Co",
    color: "Silver"},
    { brand: "Venture",
    color: "Black"},
    { brand: "Tensor",
    color: "Silver"},
    { brand: "ACE Trucks MFG",
    color: "Silver"},
    { brand: "Calibre Truck Co",
    color: "Silver"},
    { brand: "Paris",
    color: "Black"},
    { brand: "Gullwing",
    color: "Silver"}
];


(async function () {
    const allUsers = await User.find()
    trucksSeeds.forEach((trucks) => {
        trucks.seller = getRandomId(allUsers)
    })
    const trucksSeedsWithSeller = await Trucks.create(trucksSeeds)
    console.log(trucksSeedsWithSeller)
    process.exit()
})()