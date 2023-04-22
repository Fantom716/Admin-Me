const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const moment = require("moment");
const app = express();
const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const PORT = 5000;

function RandomValue(min = 1, max = 10000) {
    return Math.floor(Math.random() * (max - min))
}

const conn = mysql.createConnection({
    host: "db4free.net",
    user: "databasefornade",
    database: "databasefornade",
    password: "databasefornade",
    port: 3306,
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/form", (req, res) => {
    let date = (moment().format('YYYY-MM-DD'));
    conn.query(`INSERT INTO users(idUser, login, email, role, regDate, password) VALUES(${(RandomValue())}, '${req.body.login}', '${req.body.email}', '${req.body.role}', '${date}', '${req.body.password}')`, (err, results) => {
        if (err) console.log(err);
    })
    res.send("OK");
})

app.get("/users", (req, res) => {
    conn.query("SELECT login, password FROM users", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})