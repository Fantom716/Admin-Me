const express = require("express");
const mysql = require("mysql");
const axios = require("axios");
const bp = require("body-parser");
const bodyParser = bp.json();
const app = express();
const PORT = 5001;

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

app.get("/dashboard/managers", (req, res) => {
    conn.query("SELECT login, email FROM users WHERE role = 'Менеджер'", (err, results) => {
        if (err) console.log(err);
        res.send(results);
    })
})

app.get("/dashboard/statistic", (req, res) => {
    const statistic = [
        {
            name: "Продажи",
            value: "",
        },
        {
            name: "Партнеры",
            value: "",
        },
        {
            name: "Клиенты",
            value: "",
        }
    ]
    conn.query("SELECT COUNT (*) FROM sells", (err, results) => {
        if (err) console.log(err);
        statistic[0]["value"] = results[0]['COUNT (*)'];
        console.log(statistic);
    })
    conn.query("SELECT COUNT (*) FROM partners", (err, results) => {
        if (err) console.log(err);
        statistic[1]["value"] = results[0]['COUNT (*)'];
    })
    conn.query("SELECT COUNT (*) FROM clients", (err, results) => {
        if (err) console.log(err);
        statistic[2]["value"] = results[0]['COUNT (*)'];
        res.send(statistic);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})