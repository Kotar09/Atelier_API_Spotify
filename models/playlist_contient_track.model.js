const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

const PlaylistContientTrack = {
  getAll: (callback) => {
    connection.query('SELECT * FROM Playlist_Contient_Track', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  create: (newPlaylistTrack, callback) => {
    connection.query('INSERT INTO Playlist_Contient_Track SET ?', newPlaylistTrack, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = PlaylistContientTrack;
