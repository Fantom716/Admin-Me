const mysql = require('mysql');
const express = require('express');
const app = express();

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
        conn.query(`SELECT * FROM orders WHERE client = ${idUser}`, (err, result) => {
            if (err) {
                reject(err)
            }
            console.log(result)
            resolve(result)
            app.get('/orders', (req, res) => {
                res.send(result)
            })
        })
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = selectOrder