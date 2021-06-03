const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStorage = require('connect-mongodb-session')(session);

const rutas = require('./routes/main');
const rutasPrueba = require('./routes/test');
const rutasREST = require('./routes/rest');
const eController = require('./controllers/errorController');

const db_url = 'mongodb://127.0.0.1:27017/base_datos_spleeter';
const auth = require('./services/autenticacion');

const app = express();
const sesStorage = new sessionStorage({
    uri: db_url,
    collection: 'sesiones'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

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
app.use(session({secret:'sopa do macaco', resave: false, saveUninitialized:false, store: sesStorage}));
app.use('/test', rutasPrueba);
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(rutas);

app.use(auth.corsHeaders);
app.use(express.json());
app.use(rutasREST);
app.use(eController.e404);


mongoose.connect(db_url).then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});