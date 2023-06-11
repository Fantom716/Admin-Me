const conn = require("./connectionDB")

const checkMatch = (number, array) => {
  return array.some((item) => item.idSession === number);
};

const getRandomUniqueNumber = async (idField, table) => {
  const query = `SELECT ${idField} FROM ${table}`;
  return new Promise((resolve, reject) => {
    conn.query(query, (err, results) => {
      if (err) console.log(err);
      else {
        console.log(query)
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