const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

const app = express();
const PORT = 5010;

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

let order = {
    composition: "",
    dateDeadline: "",
    status: "",
    idOrder: "",
}

const queryAndUpdate = (idUser) => {
    conn.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected!");
            conn.query(`SELECT idClientInUser FROM users WHERE idUser = ${idUser}`, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    const idClient = results[0].idClientInUser;
                    conn.query(`SELECT * FROM orders WHERE client = ${idClient}`, (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const orders = results.map((item) => {
                                const order = {
                                    composition: item.composition,
                                    dateDeadline: item.dateDeadline,
                                    status: item.status,
                                    idOrder: item.idOrder
                                };
                                return order;
                            });
                            conn.end()
                            app.get("/dashboard/user/orders", (req, res) => {
                                res.send(orders);
                            })
                        }
                    });
                }
            });
        }
    });
};


app.post("/order/user", (req, res) => {
    const idUser = req.query.idUser
    console.log(idUser)
    queryAndUpdate(idUser)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
