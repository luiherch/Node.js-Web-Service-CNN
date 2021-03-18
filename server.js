const express = require('express');
const multer = require('multer');
const path = require('path');
const mongodb = require('mongodb');

const rutas = require('./routes/main');

const server = express();

const almacenamiento = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'audios');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now()+file.originalname);
    }
});

const filtro_mime = (req, file, callback) => {
    console.log(file.mimetype);
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav'){
        console.log("Se guarda");
        callback(null, true);
    } else{
        console.log("No se guarda");
        callback(null, false);
    }
}

server.use(multer({storage:almacenamiento, fileFilter:filtro_mime}).single('audio_track'));
server.use(rutas);

const cliente_mongo = mongodb.MongoClient;
const db_url = 'mongodb://127.0.0.1:27017/base_datos_node';
let database;

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
            server.listen(3000);
        }
    });

