const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/partners/add", (req, res) => {
    conn.query(`INSERT INTO partners(idPartner, type, phoneNumber, address, dateConclusionContract, email, nameDelegate, surnameDelegate, patronymicDelegate, nameCompany) VALUES(8, '${req.body.type}', '${req.body.phoneNumber}', '${req.body.address}', '${req.body.dateConclusionContract}', '${req.body.email}', '${req.body.nameDelegate}', '${req.body.surnameDelegate}', '${req.body.patronymicDelegate}', '${req.body.nameCompany}')`, (err, results) => {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            console.log("OK")
            res.send(results);
        }
    })
})

app.post("/partners/delete", (req, res) => {
    console.log(req.body)
    conn.query(`DELETE FROM partners WHERE idPartner=${req.body.idPartner}`, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("OK")
        }
    })
})

app.post("/partners/update", (req, res) => {
    console.log(req.body.dateConclusionContract)
    req.body.dateConclusionContract = moment(req.body.dateConclusionContract, "DD.MM.YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    conn.query(`UPDATE partners SET type='${req.body.type}', phoneNumber='${req.body.phoneNumber}', address='${req.body.address}', dateConclusionContract='${req.body.dateConclusionContract}', email='${req.body.email}', nameDelegate='${req.body.nameDelegate}', surnameDelegate='${req.body.surnameDelegate}', patronymicDelegate='${req.body.patronymicDelegate}', nameCompany='${req.body.nameCompany}' WHERE idPartner=${req.body.idPartner}`, (err, results) => {
        if (err) {
            console.log(err)
        } else {

            console.log("OK")
        }
    })
})

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