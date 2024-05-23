const express = require('express');
const router = express.Router();
const playlistContientTrack = require('../controllers/playlist_contient_track.controller');

router.get('/playlist_tracks', playlistContientTrack.findAll);
router.post('/playlist_tracks', playlistContientTrack.create);

module.exports = router;
