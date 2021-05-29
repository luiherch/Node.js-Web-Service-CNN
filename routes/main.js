const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

//importamos controladores
//const controlador = require('../controllers/audioManager');
const controlador = require('../controllers/fileController');

// /main => GET
router.get('/main', (req, res, next) => {
  //enviamos el fichero html estatico
  res.sendFile(path.join(rootDir, 'views', 'main.html'));
});

// /main => POST
//router.post('/main', controlador.manageAudio);
router.post('/main', controlador.fullFunction);

module.exports = router;