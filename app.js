const express = require('express');
const multer = require('multer');
const path = require('path');

const rutas = require('./routes/main');

const app = express();

app.use(rutas);

app.listen(3000);