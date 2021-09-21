const express = require("express");
const controller = require("../controllers/highscore");

const Router = express.Router();

Router.get("/", controller.getAllHighscore);
Router.post("/", controller.postHighscore);

module.exports = Router;
