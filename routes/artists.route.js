const express = require('express');
const router = express.Router();
const artists = require('../controllers/artists.controller');

router.get('/artists', artists.findAll);
router.post('/artists', artists.create);

module.exports = router;
