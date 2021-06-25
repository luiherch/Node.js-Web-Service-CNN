const express = require('express');
const router = express.Router();

//importamos controladores
//const controlador = require('../controllers/audioManager');
const controlador = require('../controllers/fileController');
const userController = require('../controllers/userController');

const auth = require('../services/autenticacion');

// /main => GET
router.get('/main', (req, res, next) => {
  res.render('main', {
    autenticado: req.session.logged,
    path: '/main'
  });
});

// router.get('/api', (req, res, next) => {
//   res.render('api', {
//     autenticado: req.session.logged,
//     path: '/api'
//   });
// });

router.get('/signup', (req, res, next) => {
  res.render('signup', {
    autenticado: false,
    path: '/signup'
  });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    autenticado: false,
    path: '/login'
  });
});

// /main => POST
//router.post('/main', controlador.manageAudio);
router.post('/main', controlador.fullFunction);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/logout', auth.ensureAuth, userController.logout);

module.exports = router;