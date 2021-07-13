// get the client
const mysql = require('mysql2');

// create the connection to database
const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1108',
  database: 'woowa_db',
};

const getPosts = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    connection.query('SELECT * FROM post', function (err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
};
getPosts().then((r) => {
  console.log(r);
});
