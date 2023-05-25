const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const cors = require("cors")
const conn = require("../utils/connectionDB")

const app = express();
app.use(cors());
const PORT = 5095;

const collectData = (idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idClient, idClientInUser, name, surname, patronimyc, passportInfo, email, phoneNumber, regDate, rating FROM clients INNER JOIN users ON clients.idClient = users.idClientInUser WHERE idUser = ${idUser}`, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                res.map((item) => {
                    item.regDate = moment().format("YYYY-MM-DD HH:mm:ss");
                    const dataClient = {
                        idClient: item.idClient,
                        idClientInUser: item.idClientInUser,
                        name: item.name,
                        surname: item.surname,
                        patronimyc: item.patronimyc,
                        passportInfo: item.passportInfo,
                        email: item.email,
                        phoneNumber: item.phoneNumber,
                        regDate: item.regDate,
                        rating: item.rating
                    }
                    console.log(dataClient);
                    resolve(dataClient);
                });
            }
        });
    });
}

const sendDataProfile = (data) => {
    collectData(data).then((dataClient) => {
        app.get("/clients/profile", (req, res) => {
            res.send(dataClient);
        })
    })
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = sendDataProfile, collectData;
