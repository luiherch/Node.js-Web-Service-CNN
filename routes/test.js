
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();


const controladorModelo = require('../controllers/modelController');
const fileController = require('../controllers/fileController');

// /test/model
router.get('/model', controladorModelo.serveCNN);

// /test/zip
router.get('/zip', fileController.createZip);

// /test/sendzip
router.get('/sendzip', fileController.sendZip);

router.post('/zip', fileController.sendZip);

module.exports = router;