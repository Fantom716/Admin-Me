const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5003;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

async function getPartners() {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM partners", (err, results) => {
            if (err) {
                reject(err);
            } else {
                results.map((partner) => {
                    partner["dateConclusionContract"] = moment(partner["dateConclusionContract"]).format("DD.MM.YYYY HH:mm:ss");
                })
                resolve(results);
            }
        })
    })
}

async function startPartner() {
    app.get("/partners", (req, res) => {
        getPartners().then((results) => {
            res.send(results);
        })
    })
}

startPartner();

module.exports = startPartner

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})