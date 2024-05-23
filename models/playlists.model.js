const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

const Playlist = {
  getAll: (callback) => {
    connection.query('SELECT * FROM Playlists', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  create: (newPlaylist, callback) => {
    connection.query('INSERT INTO Playlists SET ?', newPlaylist, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = Playlist;
