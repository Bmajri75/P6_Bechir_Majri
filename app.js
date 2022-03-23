// ======= Express =======
const express = require('express');// je requier express pour la creation de l'app
const morgan = require('morgan');// morgan pour pour un retours des codes status
const mongoose = require('./database/mongoose');//le module mongoose pour la conexion à la base de donnée;
// const bodyParser = require('body-parser');// body parser permet de trensformer le corp de la request en Json

const app = express();// je place dans app le module express
app.use(express.json()); // meme travail que bodyparser

// importation des routes via le dossier routes:
const routesUser = require('./routes/user');

app.use(morgan('dev'));// je configure le package morgan avec une config pré etablie

// Configuration du CORS,  (Cross-Origin Request Sharing) celui ci est utils l orsque le front ou autre est sur des serveur differents,
// je lui donne tout les acces 
app.use((req, res, next) => { // app.use pour toutes les requettes 
  res.setHeader("Access-Control-Allow-Origin", "*"); // parametre origine définie l'URI qui peut acceder à la resources. * pour toutes le mondes
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");// on autorise l'utilisation de certains Headers dans l'objet Request
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); // on autorises les Methodes cité dans la request
  next();
});

app.use('/api/auth', routesUser)

// J'export app qui sera appeler sur server.js
module.exports = app;