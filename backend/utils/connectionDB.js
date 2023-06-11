const mysql = require("mysql");
require('dotenv').config({path: "../../.env.development"});

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
})

module.exports = conn;
