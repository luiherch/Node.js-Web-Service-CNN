const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionStorage = require('connect-mongodb-session')(session);

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const rutas = require('./routes/main');
const rutasPrueba = require('./routes/test');
const rutasREST = require('./routes/rest');
const eController = require('./controllers/errorController');

const db_url = 'mongodb://127.0.0.1:27017/base_datos_spleeter';
const auth = require('./services/autenticacion');

const swaggerOptions = {
    definition:{
        info: {
            title: 'Prisma API',
            version: '1.0.0',
            description: "API information",
            contact: {
                name: "Luis Chirlaque"
            }
        },
    },
    apis: ["routes/rest.js"]
};
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
  

const app = express();
//cabeceras de seguridad
app.use(function (req, res, next) {  
    res.header("X-powered-by", "Prisma");
    next();
  });
  
// app.use(function (req, res, next) {
//     res.setHeader(
//       'Content-Security-Policy',
//       "default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'; style-src-elem 'self' https://fonts.googleapis.com"
//     );
//     next();
//   });
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
app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
  );
app.use(eController.e404);


mongoose.connect(db_url).then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});