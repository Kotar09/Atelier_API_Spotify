const Artist = require('../models/artists.model');

exports.findAll = (req, res) => {
  Artist.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de la récupération des artistes'
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

  const newArtist = {
    artist_uri: req.body.artist_uri,
    arist_name: req.body.arist_name
  };

  Artist.create(newArtist, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de post de l artiste'
      });
    } else {
      res.send(data);
    }
  });
};
