const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

// /main => GET
router.get('/main', (req, res, next) => {
  //enviamos el fichero html estatico
  res.sendFile(path.join(rootDir, 'views', 'main.html'));
});

// /main => POST
router.post('/main', (req, res, next) => {
  //res.redirect('/');
});

module.exports = router;