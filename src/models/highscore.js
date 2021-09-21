const db = require("../config/db");

module.exports = {
  getAllHighscore: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM highscores", (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },

  postHighscore: (body) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO highscores (username, win_streak) VALUES ($1, $2)",
        [body.username, body.win_streak],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
};
