const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose')

const rutas = require('./routes/main');
const rutasPrueba = require('./routes/test');
const eController = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');

const almacenamiento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'audios');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now()+file.originalname);
    }
});

const filtroMime = (req, file, callback) => {
    console.log(file.mimetype);
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav'){
        console.log("Multer: Archivo almacenado");
        callback(null, true);
    } else{
        console.log("Multer: Error al almacenar");
        callback(null, false);
    }
}

app.use(multer({storage:almacenamiento, fileFilter:filtroMime}).single('audio_track'));
app.use(express.static(__dirname + '/public'));
app.use('/test', rutasPrueba);
app.use(rutas);
app.use(eController.e404);

const db_url = 'mongodb://127.0.0.1:27017/base_datos_spleeter';

mongoose.connect(db_url).then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});