const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');
//importamos controladores
//const controlador = require('../controllers/audioManager');
const controlador = require('../controllers/fileController');
const userController = require('../controllers/userController');

const auth = require('../services/autenticacion');

// /main -> GET
router.get('/main', (req, res, next) => {
  res.render('main', {
    autenticado: req.session.logged,
    path: '/main'
  });
});

// /signup -> GET
router.get('/signup', (req, res, next) => {
  res.render('signup', {
    autenticado: false,
    path: '/signup'
  });
});

// /login -> GET
router.get('/login', (req, res, next) => {
  res.render('login', {
    autenticado: false,
    path: '/login'
  });
});

// /main -> POST
router.post('/main', controlador.fullFunction);

// /signup -> POST
router.post('/signup', check('email').isEmail(),userController.signup);

// /login -> POST
router.post('/login', check('email').isEmail(), userController.login);

// /logout -> POST
router.post('/logout', auth.ensureAuth, userController.logout);

module.exports = router;