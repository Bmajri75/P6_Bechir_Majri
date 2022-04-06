/**
 *  ==> app.js
 * ! ==>  ce fichier contien la configuration Géneral de mon app
 * 
 */

// * =====> Mes require ========
const express = require('express');// express fournit un ensemble de méthodes pour les requêtes HTTP + système de middleware 
const morgan = require('morgan');// morgan HTTP request logger middleware pour node.js
const mongoose = require('./database/mongoose');//mongoose sert de médiateur entre l'application NodeJS et le serveur MongoDB. C'est un Object Document Mapper (ODM) 
const path = require('path');// Path module de chemin Node.js fournit des methode pour travailler avec les chemins de fichiers
const app = express();// je place dans app le module express

// * =====> require les routes a partir de "./routes"
const routesUser = require('./routes/user'); // les routes users
const routesSauces = require('./routes/sauces') // les routes sauces


/**
 * * ===> configuration CORS  ===
 * Le partage des ressources entre origines multiples (CORS, Cross Origin Resource Sharing
 * configuration du middelwar pour toutes les routes (app.use) celui ci sera lancer en premier.
 */
app.use((req, res, next) => { // je donne en response a la requette les information du header
  res.setHeader('Access-Control-Allow-Origin', '*'); // je donne les plein droit
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //j'autorise l'acces a ces headers.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // pour toutes ces methode
  next(); // on passe au suivant middlewar
});


app.use(express.json()); // meme travail que bodyparser pour toutes les demandes 
app.use(morgan('dev'));// je configure le package morgan avec une config pré etablie


// la route des images 
/**
 * __dirname == le dossier sur le quel on se trouve
 */

// ici on sert le dossier static 
app.use('/images', express.static(path.join(__dirname, '/images'))); // .join => pour joindre les segments de chemin ici __dirname/images
// __dirname => Donne le chemin absolu du répertoire qui contient le fichier en cours d’exécution.


// * ====> Mes chemin URL Generale ===
//  authantifications
app.use('/api/auth', routesUser);
// sauces 
app.use('/api/sauces', routesSauces);



//* ===>  J'export app qui sera appeler sur ./server.js
module.exports = app;