const express = require('express');
const router = express.Router();
const playlists = require('../controllers/playlists.controller');

router.get('/playlists', playlists.findAll);
router.post('/playlists', playlists.create);

module.exports = router;
