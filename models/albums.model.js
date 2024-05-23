const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

const Album = {
  getAll: (callback) => {
    connection.query('SELECT * FROM Albums', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  create: (newAlbum, callback) => {
    connection.query('INSERT INTO Albums SET ?', newAlbum, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = Album;
