const PlaylistContientTrack = require('../models/playlist_contient_track.model');

exports.findAll = (req, res) => {
  PlaylistContientTrack.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de la récupération des playlists contenant un track'
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

  const newPlaylistTrack = {
    pid: req.body.pid,
    track_uri: req.body.track_uri,
    pos: req.body.pos
  };

  PlaylistContientTrack.create(newPlaylistTrack, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de post des playlists contenant un track'
      });
    } else {
      res.send(data);
    }
  });
};
