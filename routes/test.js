
const express = require('express');
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

// /test/child
router.get('/child', controladorModelo.childProcess);

// /test/spleeter
router.get('/spleeter', controladorModelo.spleeter);

// /test/full
router.get('/full', fileController.fullFunction);

// /test/zip
router.post('/zip', fileController.sendZip);

module.exports = router;