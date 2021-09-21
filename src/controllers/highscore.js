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

  postHighscore: (req, res) => {
    let body = {
      username: req.body.username,
      win_streak: req.body.win_streak,
    };

    model
      .postHighscore(body)
      .then((response) => {
        res.json({
          status: 200,
          msg: "succes post highscore",
        });
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
