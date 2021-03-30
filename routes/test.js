
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();


const controladorModelo = require('../controllers/modelController');

// /test/model
router.get('/model', controladorModelo.serveCNN);

module.exports = router;