const express = require("express");
const mysql = require("mysql");
const moment = require("moment");

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

const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
const startCurrentWeek = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
const startLastWeek = moment().subtract(14, "days").format("YYYY-MM-DD HH:mm:ss");

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
    image: "/card/icons/small card add/user.svg",
    alt: "users"
  },
  {
    nameTable: "orders",
    fieldInDB: "manager",
    name: "Любимый менеджер",
    currentValue: 0,
    lastValue: 0,
    image: "/card/icons/small card add/user.svg",
    alt: "details"
  }
];

const getClientId = (idUser) => {
  console.log("id: " + idUser)
  query = `SELECT idClientInUser FROM users WHERE idUser = ${idUser}`
  conn.query("SELECT * FROM users"), (err, res) => {
    console.log(res)
  }
  return new Promise((resolve, reject) => {
    try {
      conn.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(query)
          console.log(results)
          resolve(results[0]?.idClientInUser);
        }
        console.log(err)
      })
    }
    catch (error) {
      reject(error)
    }
  })
};
const getCurrentWeekOrdersCount = (idClient) => {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) FROM orders WHERE client = ${idClient} AND dateDeadline BETWEEN '${startCurrentWeek}' AND '${nowDate}'`;
      conn.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(query)
          console.log(results[0]["COUNT(*)"])
          resolve(results[0]["COUNT(*)"]);
        }
      });
    });
  }, 1000);
};

const getLastWeekOrdersCount = (idClient) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) FROM orders WHERE client = ${idClient} AND dateDeadline BETWEEN '${startLastWeek}' AND '${startCurrentWeek}'`;
    conn.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]["COUNT(*)"]);
      }
    });
  });
};

const getClientRating = (idClient) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT rating FROM clients WHERE idClient = ${idClient}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]["rating"]);
      }
    });
  });
};

const getClientManager = (idClient) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT MAX(manager) FROM orders WHERE client = ${idClient}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]['MAX(manager)']);
      }
    });
  });
};

const updateStatistics = async () => {
  try {
    const idClient = await getClientId(idUser);
    const currentWeekOrders = await getCurrentWeekOrdersCount(idClient);
    console.log("c:" + currentWeekOrders)
    const lastWeekOrders = await getLastWeekOrdersCount(idClient);
    const rating = await getClientRating(idClient);
    const manager = await getClientManager(idClient);

    statisticUser[0].currentValue = currentWeekOrders;
    statisticUser[0].lastValue = lastWeekOrders;
    statisticUser[0].percentageState = (currentWeekOrders / lastWeekOrders) * 100;
    statisticUser[1].currentValue = rating;
    statisticUser[1].lastValue = rating;
    statisticUser[1].percentageState = 100;
    statisticUser[2].currentValue = manager;
    statisticUser[2].lastValue = manager;
    statisticUser[2].percentageState = 100;

    console.log('Statistics updated successfully');
  } catch (error) {
    console.error(error);
  }
}


async function getStat(idUser) {
  await updateStatistics(idUser);
  console.log(statisticUser)
  app.get("/dashboard/clients/statistics", (req, res) => {
    res.send(statisticUser);
  });
}

app.get("/dashboard/clients/statistics", async (req, res) => {
  await updateStatistics();
  console.log(statisticUser)
  res.send(statisticUser);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {getClientId, getStat};