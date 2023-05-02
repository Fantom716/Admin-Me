const express = require("express");
const mysql = require("mysql");
const moments = require("moment");

const app = express();
const PORT = 5011;

const conn = mysql.createConnection({
    host: "DESKTOP-ASKKTC8",
    user: "serverJS",
    database: "mydb",
    password: "jK7JgP5YbFyMRr",
    port: 3306,
})

async function getProducts() {
    return new Promise((resolve, reject) => {
        conn.query("SELECT idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, partners.nameCompany AS developer, countSell, dateOfSell  FROM products INNER JOIN partners ON products.developer = partners.idPartner", (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                results.map((product) => {
                    product["dateOfSell"] = moments(product["dateOfSell"]).format("DD.MM.YYYY HH:mm:ss");
                })
                resolve(results);
            }
        })
    })
}

async function startGetProducts() {
    app.get("/products", (req, res) => {
        getProducts().then((results) => {
            res.send(results);
        })
    })
}

startGetProducts();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

module.exports = startGetProducts