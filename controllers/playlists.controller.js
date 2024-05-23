const Playlist = require('../models/playlists.model');

exports.findAll = (req, res) => {
  Playlist.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de la récupération des playlists'
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

  const newPlaylist = {
    pid: req.body.pid,
    name: req.body.name,
    collaborative: req.body.collaborative,
    num_tracks: req.body.num_tracks,
    num_albums: req.body.num_albums,
    num_followers: req.body.num_followers,
    modified_at: req.body.modified_at
  };

  Playlist.create(newPlaylist, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Une erreur s est produite lors de post de la playlist'
      });
    } else {
      res.send(data);
    }
  });
};
