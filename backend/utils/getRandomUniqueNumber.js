const conn = require("./connectionDB")

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