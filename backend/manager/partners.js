const express = require("express");
const mysql = require("mysql");
const formattingData = require("../backend/utils/date.js");

const app = express();
const PORT = 5003;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

app.get("/partners", (req, res) => {
    formattingData.getData("SELECT * FROM partners", "dateConclusionContract").then((data) => {
        res.send(data);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})