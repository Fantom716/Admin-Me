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

app.get("/user/orders", (req, res) => {
    conn.query("SELECT * FROM orders WHERE client = 5510", (err, results) => {
        if (err) {
            console.log(err);
        }
        else {
            for (i = 0; i < results.length; i++) {
                results[i]["dateDeadline"] = moment(results[i]["dateDeadline"]).format("DD.MM.YYYY: HH:mm:ss");
            }
            res.send(results);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
