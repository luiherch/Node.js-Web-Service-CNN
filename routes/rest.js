const express = require('express');
const router = express.Router();

const restController = require('../controllers/restController');

const auth = require('../services/autenticacion');

router.post('/api/login', restController.restLogin);
router.post('/api/separate', auth.validateToken, restController.restSpleeter);

module.exports = router;