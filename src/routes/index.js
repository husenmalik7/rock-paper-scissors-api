const express = require("express");
const highscore = require("./highscore");

const Router = express.Router();

Router.use("/highscore", highscore);

module.exports = Router;
