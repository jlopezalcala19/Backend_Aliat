const express = require ('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
global.app = express();
const path = require('path');
const config = require("./config.js").config
var bodyParser = require("body-parser")
const mongoose = require("mongoose")

var cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())




// Configuración de multer
//global.upload = multer({ storage: multer.memoryStorage() });
//const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname));
//     }
//   });

///////////CONFIGURACION DE CORS INICIAL

app.all('*', function(req, res, next) {

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    //res.header('Set-Cookie: cross-site-cookie=name; SameSite=None; Secure');
    next();

});

app.use(cors({
    origin: function(origin, callback){
        //console.log(origin)
        if(!origin){
            return callback(null, true)
        }

        if(config.listablanca.indexOf(origin)===-1){
            return callback("Error de cors", false)
        }

        return callback(null, true)
    }

}))


// app.use(cors({
//     // origin: function (origin, callback) {
//     //     // Si no hay origen (por ejemplo, peticiones desde el servidor), permite la solicitud
//     //     if (!origin) {
//     //         return callback(null, true);
//     //     }
//     //     // Compara el origen con la lista blanca
//     //     if (config.listablanca.indexOf(origin) === -1) {
//     //         return callback(new Error("Error de CORS: El origen no está permitido"), false);
//     //     }
//     //     return callback(null, true); // Si el origen está en la lista blanca, permite la solicitud
//     // },
//     origin:'https://aliatesp-frontend.netlify.app',
//     methods: 'GET,PUT,POST,DELETE,OPTIONS,HEAD',
//     allowedHeaders: 'Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
//     credentials: true // Permitir el envío de cookies
// }));


//Manejo de solicitudes OPTIONS preflight para CORS
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

/////CONFIGURACIÓN DE LA SESIÓN////////////////////////////////////////////////////////////

// var session = require('express-session')({
//     secret:config.secretsession,
//     resave:true,
//     saveUninitialized:true,
//     cookie:{path:'/', httpOnly:true, maxAge:config.tiemposession},
//     name:config.namecookie,
//     rolling:true
//  })

//  app.use(session)

// Configurar el middleware de sesión
app.use(session({
    secret: config.secretsession,
    resave: false,
    saveUninitialized: false,
    cookie:{path:'/', httpOnly:true, maxAge:config.tiemposession},
    rolling:true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}));


/////////////////////////////////////////////////////////////////////////////////////////////


global.datos = []
require("./rutas.js")

///////////////////CONEXION A BASE DE DATOS////////////////////////////////////////////////////////////
//mongodb://127.0.0.1:27017/

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true}).then((respuesta)=>{
    console.log("Conexión correcta a Mongo AT")
}).catch((error)=>{
console.log(error)
})
///////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/imagenes", express.static(__dirname + "/imagenes"))
app.use("/uploads", express.static(__dirname + "/uploads"))
app.listen(config.puerto, ()=> console.log("Servidor encendido por el puerto " + config.puerto))