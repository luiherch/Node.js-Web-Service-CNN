
const express = require('express');
const router = express.Router();


const controladorModelo = require('../controllers/modelController');
const fileController = require('../controllers/fileController');

// /test/model
router.get('/model', controladorModelo.loadModel);

// /test/sendzip
router.get('/sendzip', fileController.sendZip);

// /test/full
router.get('/full', fileController.fullFunction);

// /test/zip
router.post('/zip', fileController.sendZip);

module.exports = router;