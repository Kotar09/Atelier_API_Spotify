// controllers/track.controller.js
const Track = require('../models/tracks.model');

exports.findAll = (req, res) => {
  Track.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de la récupération des tracks'
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

  const newTrack = {
    track_uri: req.body.track_uri,
    track_name: req.body.track_name,
    duration_ms: req.body.duration_ms,
    album_uri: req.body.album_uri
  };

  Track.create(newTrack, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de post de track'
      });
    } else {
      res.send(data);
    }
  });
};
