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
};
