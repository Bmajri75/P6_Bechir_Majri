// ======= Express =======
const express = require('express');// je requier express pour la creation de l'app
const morgan = require('morgan');// morgan pour pour un retours des codes status
const mongoose = require('./database/mongoose');//le module mongoose pour la conexion à la base de donnée;
const path = require('path');// Path 
const app = express();// je place dans app le module express


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json()); // meme travail que bodyparser pour toutes mes methode 
app.use(morgan('dev'));// je configure le package morgan avec une config pré etablie


// importation des routes via le dossier routes:
const routesUser = require('./routes/user');
const routesSauces = require('./routes/sauces')


// la route des images 
/**
 * __dirname == le dossier sur le quel on se trouve
 */
app.use('/images', express.static(path.join(__dirname, '/images')));

// routes authantifications
app.use('/api/auth', routesUser);

//routes avec sauces 
app.use('/api/sauces', routesSauces);

// J'export app qui sera appeler sur server.js
module.exports = app;