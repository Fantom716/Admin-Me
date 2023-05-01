const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const { idUser } = require('../user/homeUser');

const app = express();
const PORT = 5010;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
});

console.log("1:" + idUser)

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
