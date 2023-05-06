const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5095;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected!");
    }
});

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

// sendDataProfile(6886)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = sendDataProfile;