const model = require("../models/highscore");

module.exports = {
  getAllHighscore: (req, res) => {
    model
      .getAllHighscore()
      .then(async (response) => {
        let arr = response.rows;

        let resultsPerPage = 10;
        let numOfResults = response.rows.length;
        let numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;

        if (page > numberOfPages) {
          return res.redirect(
            "/highscore?page=" + encodeURIComponent(numberOfPages)
          );
        } else if (page < 1) {
          return res.redirect("/highscore?page=" + encodeURIComponent("1"));
        }

        let startingLimit = (page - 1) * resultsPerPage;

        let arrLimitHighscore = await model
          .getLimitHighscore(startingLimit, resultsPerPage)
          .then((response) => {
            return response.rows;
          })
          .catch((error) => {
            console.log(error);
          });

        let iterator = page - 5 < 1 ? 1 : page - 5;

        let endingLink =
          iterator + 9 <= numberOfPages
            ? iterator + 9
            : page + (numberOfPages - page);

        if (endingLink < page + 4) {
          iterator -= page + 4 - numberOfPages;
        }

        // console.log({ numOfResults });
        // console.log({ numberOfPages });
        // console.log({ startingLimit });
        // console.log({ page });
        // console.log({ iterator });
        // console.log({ endingLink });
        // console.log("--------------");

        // format date
        for (let i = 0; i < arrLimitHighscore.length; i++) {
          let fullDate = new Date(arrLimitHighscore[i].created_at);
          let month = fullDate.toLocaleString("default", { month: "short" });
          let date = fullDate.getDate();
          let year = fullDate.getFullYear();

          let formattedDate = date + " " + month + " " + year;
          arrLimitHighscore[i].created_at = formattedDate;
        }

        res.json({
          status: 200,
          msg: "succes",

          page,
          iterator,
          endingLink,
          numberOfPages,
          data: arrLimitHighscore,
          // data: arr,
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
