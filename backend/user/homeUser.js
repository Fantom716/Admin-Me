const express = require("express");
const mysql = require("mysql");
const moment = require("moment");
const { nowDate, startCurrentWeek, startLastWeek } = require('../manager/homeManager');

const app = express();
const PORT = 5002;

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
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  },
  {
    nameTable: "orders",
    fieldInDB: "manager",
    name: "Любимый менеджер",
    currentValue: 0,
    lastValue: 0,
    percentageState: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "details"
  }
];

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const queryAndUpdate = (idUser) => {
  if (idUser !== undefined) {
    conn.query(`SELECT idClientInUser FROM users WHERE idUser = ${idUser}`, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        try {
          const idClient = results[0].idClientInUser;
          const query = `SELECT COUNT(*) FROM orders WHERE client = ${idClient} AND dateDeadline BETWEEN '${startCurrentWeek}' AND '${nowDate}'`;
          conn.query(query, (err, results) => {
            if (err) {
              console.error(err);
            } else {
              console.log(results);
              console.log(query);
              statisticUser[0].currentValue = results[0]["COUNT(*)"];
              conn.query(`SELECT COUNT(*) FROM orders WHERE client = ${idClient} AND dateDeadline BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`, (err, results) => {
                if (err) {
                  console.error(err);
                } else {
                  statisticUser[0].lastValue = results[0]["COUNT(*)"];
                  statisticUser[0].percentageState = (statisticUser[0].currentValue / statisticUser[0].lastValue) * 100;
                  console.log(statisticUser);
                }
              });
              conn.query(`SELECT rating FROM clients WHERE idClient = ${idClient}`, (err, results) => {
                if (err) {
                  console.error(err);
                } else {
                  statisticUser[1].currentValue = results[0]["rating"];
                  conn.query(`SELECT rating FROM clients WHERE idClient = ${idClient}`, (err, results) => {
                    if (err) {
                      console.error(err);
                    } else {
                      statisticUser[1].lastValue = results[0]["rating"];
                      statisticUser[1].percentageState = (statisticUser[1].currentValue / statisticUser[1].lastValue) * 100;
                      console.log(statisticUser);
                    }
                  });
                }
              });
              conn.query(`SELECT manager FROM orders WHERE client = ${idClient}`, (err, results) => {
                if (err) {
                  console.error(err);
                } else {
                  statisticUser[2].currentValue = results[0]["manager"];
                  conn.query(`SELECT manager FROM orders WHERE client = ${idClient}`, (err, results) => {
                    if (err) {
                      console.error(err);
                    } else {
                      statisticUser[2].lastValue = results[0]["manager"];
                      statisticUser[2].percentageState = (statisticUser[2].currentValue / statisticUser[2].lastValue) * 100;
                      console.log(statisticUser);
                      conn.end()
                    }
                  });
                }
              });
              myEmitter.emit('dataChanged', statisticUser);
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
};


app.post("/dashboard/user", (req, res) => {
  const idUser = req.query.id;
  console.log(idUser)
  queryAndUpdate(idUser);
});

myEmitter.on('dataChanged', (data) => {
  app.get("/dashboard/users/statisticCard", (req, res) => {
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
