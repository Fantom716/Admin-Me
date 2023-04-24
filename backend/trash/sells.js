const express = require("express");
const mysql = require("mysql");
const formattingData = require("../utils/date.js");

const app = express();
const PORT = 5004;

app.get("/sells", (req, res) => {
    const query = "SELECT * FROM sells";
    const field = "dateSell";
    formattingData.getData(query, field).then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})