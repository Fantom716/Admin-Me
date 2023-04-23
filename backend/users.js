const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const moment = require("moment");
const bp = require("body-parser");

const app = express();
const PORT = 5006;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

function RandomValue(min = 1, max = 10000) {
    return Math.floor(Math.random() * (max - min))
}

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

conn.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.post("/form", (req, res) => {
    console.log(req.body);
    let date = new Date().getDate() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
    date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    conn.query(`INSERT INTO users(idUsers, login, email, role, regDate, password) VALUES(${(RandomValue())}, '${req.body.login}', '${req.body.email}', '${req.body.role}', '${date}', '${req.body.password}')`, (err, results) => {
        if (err) console.log(err);
        else {
            console.log("OK");
        }
    })
    res.send("OK");
})

app.get("/users", (req, res) => {
    conn.query("SELECT login, password, email FROM users", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})