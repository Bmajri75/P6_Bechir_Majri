// ======= Express =======
const express = require('express');// je requier express pour la creation de l'app
const morgan = require('morgan');// morgan pour pour un retours des codes status
const mongoose = require('./database/mongoose');//le module mongoose pour la conexion à la base de donnée;
const cors = require('cors');
const path = require('path');

const app = express();// je place dans app le module express
app.use(cors());// methode pour autoriser les connexion entre les machines qui ne sont pas heberger sur les meme server
app.use(express.json()); // meme travail que bodyparser pour toutes mes methode 
app.use(morgan('dev'));// je configure le package morgan avec une config pré etablie


// importation des routes via le dossier routes:
const routesUser = require('./routes/user');
const routesSauces = require('./routes/sauces')


// routes authantifications
app.use('/api/auth', routesUser);

//routes avec sauces 
app.use('/api/sauces', routesSauces)
app.use('/vue/images', express.static(path.join(__dirname, 'vue/images')));
// J'export app qui sera appeler sur server.js
module.exports = app;