const Album = require('../models/albums.model');

exports.findAll = (req, res) => {
  Album.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de la récupération des albums'
      });
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Le contenu ne peut pas être vide'
    });
  }

  const newAlbum = {
    album_uri: req.body.album_uri,
    album_name: req.body.album_name,
    artist_uri: req.body.artist_uri
  };

  Album.create(newAlbum, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de post de l album'
      });
    } else {
      res.send(data);
    }
  });
};
