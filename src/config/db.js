const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "autorack.proxy.rlwy.net",
  database: "railway",
  password: "GYBAQAuWgzpqrgdOfJfWJsDhuTXGHOgp",
  port: 41194,
  // ssl: true,

  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((error) => {
  if (error) throw error;
});

module.exports = pool;
