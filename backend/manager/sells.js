const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const cors = require("cors")
const app = express();
const conn = require("../utils/connectionDB");

app.use(cors());
const PORT = 5010;

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
