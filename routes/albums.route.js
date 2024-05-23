const express = require('express');
const router = express.Router();
const albums = require('../controllers/albums.controller');

router.get('/albums', albums.findAll);
router.post('/albums', albums.create);

module.exports = router;
