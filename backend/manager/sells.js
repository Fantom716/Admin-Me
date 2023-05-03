const express = require("express");
const mysql = require("mysql");
const moments = require("moment");

const app = express();
const PORT = 5010;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
})

async function getSells() {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM sells", (err, results) => {
            if (err) {
                reject(err);
            } else {
                results.map((sell) => {
                    sell["dateSell"] = moments(sell["dateSell"]).format("DD.MM.YYYY HH:mm:ss");
                })
                resolve(results);
            }
        })
    })
}

async function startGetSells() {
    app.get("/sells", (req, res) => {
        getSells().then((results) => {
            res.send(results);
        })
    })
}

startGetSells();

module.exports = startGetSells

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})