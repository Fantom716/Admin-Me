const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const cors = require("cors")
const conn = require("../utils/connectionDB")
const bodyParser = require("body-parser")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 5002;

const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
const startCurrentWeek = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
const startLastWeek = moment().subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");

app.post("/user/dashboard/getdata", (req, res) => {
  const idUser = req.body.id;
  const stat = updateStatistics(idUser);
  res.send(stat);
})

app.get("/dashboard/clients/products", (req, res) => {
  conn.query("SELECT nameProduct, descriptionProduct FROM products", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const newResults = results.map(({ nameProduct, descriptionProduct, ...rest }) => {
        return {
          ...rest,
          title: nameProduct,
          description: descriptionProduct,
          titleRubric: "Наши продукты"
        };
      });
      res.send(newResults);
    }
  });
});

const statisticUser = [
  {
    nameTable: "orders",
    fieldInDB: "client",
    name: "Количество заказов",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/hourglass.svg",
    alt: "hourglass"
  },
  {
    nameTable: "clients",
    fieldInDB: "rating",
    name: "Рейтинг",
    currentValue: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  },
];

const getClientId = (idUser) => {
  const values = idUser;
  const query = `SELECT idClientInUser FROM users WHERE idUser = ?`;

  return new Promise((resolve, reject) => {
    try {
      conn.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].idClientInUser);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCurrentWeekOrdersCount = (idClient) => {
  const query = 'SELECT COUNT(*) FROM orders WHERE client = ? AND dateDeadline BETWEEN ? AND ?';
  const values = [idClient, startCurrentWeek, nowDate];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      conn.query(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]["COUNT(*)"]);
        }
      });
    }, 1000);
  });
};

const getLastWeekOrdersCount = (idClient) => {
  const values = [idClient, startLastWeek, startCurrentWeek]
  const query = 'SELECT COUNT(*) FROM orders WHERE client = ? AND dateDeadline BETWEEN ? AND ?';

  return new Promise((resolve, reject) => {
    conn.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]["COUNT(*)"]);
      }
    });
  });
};

const getClientRating = (idClient) => {
  const query = 'SELECT rating FROM clients WHERE idClient = ?';
  const values = idClient

  return new Promise((resolve, reject) => {
    conn.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]["rating"]);
      }
    });
  });
};

const updateStatistics = async (idUser) => {
  try {
    const idClient = await getClientId(idUser);
    const currentWeekOrders = await getCurrentWeekOrdersCount(idClient);
    const lastWeekOrders = await getLastWeekOrdersCount(idClient);
    const rating = await getClientRating(idClient);

    statisticUser[0].currentValue = currentWeekOrders;
    statisticUser[0].lastValue = lastWeekOrders;
    statisticUser[0].percentageState = ((currentWeekOrders / lastWeekOrders) * 100).toFixed(2);
    statisticUser[1].currentValue = rating;

    console.log('Statistics updated successfully');
  } catch (error) {
    console.error(error);
  }
}

app.get("/dashboard/clients/statistics", async (req, res) => {
  res.send(statisticUser);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = updateStatistics;