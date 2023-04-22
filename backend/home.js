const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const bp = require("body-parser");

const app = express();
const PORT = 5000;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "FANTOM65265126",
    port: 3306,
})

conn.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
})

app.get("/dashboard", (req, res) => {
    conn.query("SELECT login, email FROM users WHERE role = 'Менеджер'", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})