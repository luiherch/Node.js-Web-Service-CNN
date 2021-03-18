const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

//importamos controladores
const controlador = require('../controllers/audio_manager');

// /main => GET
router.get('/main', (req, res, next) => {
  //enviamos el fichero html estatico
  res.sendFile(path.join(rootDir, 'views', 'main.html'));
});

// /main => POST
router.post('/main', controlador.manage_audio);

module.exports = router;