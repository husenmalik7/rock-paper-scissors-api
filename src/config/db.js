const Pool = require("pg").Pool;

const pool = new Pool({
  user: "qafdqoefuzmbhi",
  host: "ec2-3-234-22-132.compute-1.amazonaws.com",
  database: "d2t80k7j6r1jic",
  password: "d18b56a75613b61f08e01347bd6723d0c91b4cb593b50ed2c312572a1d14593c",
  port: 5432,
  // ssl: true,

  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((error) => {
  if (error) throw error;
});

module.exports = pool;
