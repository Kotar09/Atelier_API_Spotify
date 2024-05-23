// routes/track.routes.js
const express = require('express');
const router = express.Router();
const tracks = require('../controllers/tracks.controller');

router.get('/tracks', tracks.findAll);
router.post('/tracks', tracks.create);

module.exports = router;
