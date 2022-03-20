// je requier dotenv et sa config pour gerer les Variables d'environements.
require('dotenv').config();

//===== GESTION DataBase ====
// requiere Mongoose (pour la gestion et la conexion a la Database MongoDB)
const mongoose = require('mongoose');

// je place mes Parametre de conexion dans la constante paramConnectDb
const paramConnectDb = `mongodb+srv://${process.env.LOGIN_DB}:${process.env.PASSWORD_DB}@cluster0.6jkmr.mongodb.net/${process.env.NAME_DB}?retryWrites=true&w=majority`;

// Avec la methode connect de mongoose je rentre mes parametre pour la conexion à la Base de donnée.
mongoose.connect(`${paramConnectDb}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // je recupere la promise et je console.log que la conexion est reussi
  .then(() => console.log('Connexion à MongoDB réussie !'))
  // console.log(si erreur je console.log que la connexion est un echecs)
  .catch(() => console.error('Connexion à MongoDB échouée !'));

module.exports = mongoose;// j'export le module mongoose pour le recuperer sur app.js