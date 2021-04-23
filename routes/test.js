
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();


const controladorModelo = require('../controllers/modelController');
const fileController = require('../controllers/fileController');
const audioController = require('../controllers/audioManager');

// /test/model
router.get('/model', controladorModelo.loadModel);

// /test/zip
router.get('/zip', fileController.createZip);

// /test/sendzip
router.get('/sendzip', fileController.sendZip);

// /test/waveform
router.get('/waveform', audioController.generateWaveform);

router.post('/zip', fileController.sendZip);

module.exports = router;