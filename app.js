const express = require('express');
const multer = require('multer');
const path = require('path');
const mongodb = require('mongodb');

const rutas = require('./routes/main');
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
        console.log("Se guarda");
        callback(null, true);
    } else{
        console.log("No se guarda");
        callback(null, false);
    }
}

app.use(multer({storage:almacenamiento, fileFilter:filtroMime}).single('audio_track'));
app.use(rutas);
app.use(eController.e404);

const clienteMongo = mongodb.MongoClient;
const db_url = 'mongodb://127.0.0.1:27017/base_datos_node';
let database;

/*
cliente_mongo.connect(
    db_url,
    {useNewUrlParser:true, useUnifiedTopology:true},
    (error, cliente) => {
        if (error){
            console.log(error);
            throw error;
        } else{            
            database = cliente.db();
            console.log(database);
            app.listen(3000);
        }
    });
    */
    app.listen(3000);

