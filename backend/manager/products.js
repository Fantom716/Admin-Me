const express = require("express");
const mysql = require("mysql");
const moments = require("moment");
const app = express();
const bodyParser = require('body-parser');
const getRandomUniqueNumber = require("../utils/getRandomUniqueNumber");
const cors = require("cors");
const conn = require("../utils/connectionDB");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5011;

async function getProducts() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, partners.nameCompany AS developer, countSell, dateOfSell FROM products INNER JOIN partners ON products.developer = partners.idPartner", (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        results.map((product) => {
          product["dateOfSell"] = moment(product["dateOfSell"]).format("DD.MM.YYYY")
        })
        console.log(results)
        resolve(results);
      }
    })
  })
}

app.post('/products/add', async (req, res) => {
  try {
    const idProduct = await getRandomUniqueNumber("idProduct", "products");
    const { nameProduct, descriptionProduct, categoryProduct, priceProduct, count, developer, countSell, dateOfSell } = req.body;
    const query = "INSERT INTO products(idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, developer, countSell, dateOfSell) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [idProduct, nameProduct, descriptionProduct, categoryProduct, priceProduct, count, developer, countSell, dateOfSell];

    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("OK");
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

async function startGetProducts() {
  app.get("/products", (req, res) => {
    getProducts().then((results) => {
      res.send(results);
    })
  })
}

app.post("/products/delete", async (req, res) => {
  try {
    const { idProduct } = req.body;
    const query = `DELETE FROM products WHERE idProduct = ?`;
    const values = [idProduct];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("OK");
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/products/update", async (req, res) => {
  try {
    const { nameProduct, descriptionProduct, categoryProduct, priceProduct, count, countSell, dateOfSell, idProduct } = req.body;
    const formattedDate = moment(dateOfSell, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    const query = `UPDATE products SET nameProduct = ?, descriptionProduct = ?, categoryProduct = ?, priceProduct = ?, count = ?, countSell = ?, dateOfSell = ? WHERE idProduct = ?`;
    const values = [nameProduct, descriptionProduct, categoryProduct, priceProduct, count, countSell, formattedDate, idProduct];
    conn.query(query, values, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("OK");
        res.send(results);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

startGetProducts();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

module.exports = startGetProducts
