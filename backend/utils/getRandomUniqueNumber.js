const mysql = require("mysql")

const conn = mysql.createConnection({
  host: "DESKTOP-ASKKTC8",
  user: "serverJS",
  database: "mydb",
  password: "jK7JgP5YbFyMRr",
  port: 3306,
})

const checkMatch = (number, array) => {
  return array.some((item) => item.idSession === number);
};

const getRandomUniqueNumber = async (idField, table) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT ${idField} FROM ${table}`, (err, results) => {
      if (err) console.log(err);
      else {
        let newResult = results;
        let randomNumber = Math.floor(Math.random() * 10000);
        while (checkMatch(randomNumber, newResult)) {
          randomNumber = Math.floor(Math.random() * 10000);
        }
        resolve(randomNumber);
      }
    });
  })
};

module.exports = getRandomUniqueNumber;