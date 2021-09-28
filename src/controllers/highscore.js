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

  postHighscore: async (req, res) => {
    let body = {
      username: req.body.username,
      win_streak: req.body.win_streak,
    };

    let doCheckUsername = await model
      .checkUsername(body)
      .then((response) => {
        console.log(response.rowCount);

        if (response.rowCount) {
          res.json({
            status: 200,
            msg: "username found, duplicate possibility",
          });

          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (!doCheckUsername) {
      return null;
    }

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
