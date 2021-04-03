
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();


const controladorModelo = require('../controllers/modelController');
const fileController = require('../controllers/fileController');

// /test/model
router.get('/model', controladorModelo.serveCNN);

// /test/zip
router.get('/zip', fileController.createZip);

module.exports = router;