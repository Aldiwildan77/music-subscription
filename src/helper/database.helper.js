const {createPool} = require('mysql');
const pool = createPool({
  user: "root",
  password: "root",
  database: "music_subscription",
  host: "localhost",
  port: 3306,
  connectionLimit: 10,
});

module.exports = pool;