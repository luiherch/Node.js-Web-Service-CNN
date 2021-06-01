const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

//importamos controladores
//const controlador = require('../controllers/audioManager');
const controlador = require('../controllers/fileController');
const userController = require('../controllers/userController');

const auth = require('../services/autenticacion');

// /main => GET
router.get('/main', (req, res, next) => {
  //enviamos el fichero html estatico
  //res.sendFile(path.join(rootDir, 'views', 'main.ejs'));
  res.render('main', {
    autenticado: req.session.logged,
    path: '/main'
  });
});

// /main => POST
//router.post('/main', controlador.manageAudio);
router.post('/main', controlador.fullFunction);

router.get('/signup', (req, res, next) => {
  //enviamos el fichero html estatico
  res.render('signup', {
    autenticado: false,
    path: '/signup'
  });
});

router.post('/signup', userController.signup);

router.get('/login', (req, res, next) => {
  //enviamos el fichero html estatico
  res.render('login', {
    autenticado: false,
    path: '/login'
  });
});

router.post('/login', userController.login);

router.post('/logout', auth.ensureAuth, userController.logout);

module.exports = router;