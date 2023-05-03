const mysql = require('mysql');
const express = require('express');
const app = express();
moment = require('moment');

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})
const PORT = 5008

let order = {
    composition: "",
    dateDeadline: "",
    status: "",
    idOrder: "",
}

const selectOrder = async (idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT idClientInUser FROM users WHERE idUser = ${idUser}`, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                idClient = result[0].idClientInUser
                query = `SELECT * FROM orders WHERE client = ${idClient}`
                conn.query(query, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    result.map((order) => {
                        order.dateDeadline = moment(order.dateDeadline).format("DD.MM.YYYY HH:mm:ss");
                    })
                    resolve(result)
                })
            }
        })
    })
}

function insertOrder(idUser) {
    app.get('/orders', (req, res) => {
        selectOrder(idUser).then((result) => {
            res.send(result)
        })
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = insertOrder