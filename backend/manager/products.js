const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        conn.query("SELECT idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, partners.nameCompany AS developer, countSell, dateOfSell FROM products INNER JOIN partners ON products.developer = partners.idPartner", (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                results.map((product) => {
                    product["dateOfSell"] = moment(product["dateOfSell"]).format("DD.MM.YYYY HH:mm:ss")
                })
                console.log(results)
                resolve(results);
            }
        })
    })
}

app.post('/products/add', (req, res) => {
    conn.query(`INSERT INTO products(idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, developer, countSell, dateOfSell) VALUES(21, '${req.body.nameProduct}', '${req.body.descriptionProduct}', '${req.body.categoryProduct}', ${req.body.priceProduct}, ${req.body.count}, ${req.body.developer}, ${req.body.countSell}, '${req.body.dateOfSell}')`, (err, results) => {
        if (err) {
            console.log(err)
            res.send(err);
        } else {
            console.log("OK")
            res.send(results);
        }
    })
})

async function startGetProducts() {
    app.get("/products", (req, res) => {
        getProducts().then((results) => {
            res.send(results);
        })
    })
}

app.post('/products/delete', (req, res) => {
    console.log(req.body)
    conn.query(`DELETE FROM products WHERE idProduct = ${req.body.idProduct}`, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("OK")
            res.send(results);
        }
    })
})

app.post('/products/update', (req, res) => {
    console.log(req.body)
    req.body.dateOfSell = moment(req.body.dateOfSell, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    conn.query(`UPDATE products SET nameProduct = '${req.body.nameProduct}', descriptionProduct = '${req.body.descriptionProduct}', categoryProduct = '${req.body.categoryProduct}', priceProduct = ${req.body.priceProduct}, count = ${req.body.count}, countSell = ${req.body.countSell}, dateOfSell = '${req.body.dateOfSell}' WHERE idProduct = ${req.body.idProduct}`, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log("OK")
            res.send(results);
        }
    })
})

startGetProducts();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

module.exports = startGetProducts