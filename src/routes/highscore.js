const express = require("express");
const controller = require("../controllers/highscore");

const Router = express.Router();

Router.get("/", controller.getAllHighscore);

module.exports = Router;
