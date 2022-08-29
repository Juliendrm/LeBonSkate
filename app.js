// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
const trucks = require("./routes/trucks.routes.js");
const board = require("./routes/board.routes");
const auth = require("./routes/auth.routes");
const wheels = require("./routes/wheels.routes");
const skateboard = require("./routes/skateboard.routes");
app.use("/api", allRoutes);
// route destinations are prefixed in app before being exported to router
app.use("/trucks", trucks);
app.use("/board", board);
app.use("/auth", auth);
app.use("/wheels", wheels);
app.use("/skateboard", skateboard);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
