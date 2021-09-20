const model = require("../models/highscore");

module.exports = {
  getAllHighscore: (_, res) => {
    model
      .getAllHighscore()
      .then((response) => {
        res.json({
          status: 200,
          msg: "succes",
          data: response.rows,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
