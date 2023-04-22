const express = require("express");
const mysql = require("mysql");
const axios = require("axios");

const app = express();
const PORT = 5004;

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

app.get("/orders", (req, res) => {
    conn.query("SELECT Sellers_idSellers, composition, dateDeadline, customer, quantity, status FROM orders", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
