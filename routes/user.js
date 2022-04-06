/**
 * ! ==> fichier des routes Users
 */

// *==> j'appel le router de Express
const express = require('express');
const router = express.Router();

// requier de mes controler pour les placer en arguments de mes routes
const controllerUser = require('../controllers/user');


// * ===== Mes Routes User=====
// le meme URI pour toutes mes requettes  
router.post('/signup', controllerUser.inscription);// inscription URL = URI + endpoint
router.post('/login', controllerUser.login);//conexion

/**
 * fonctionnement de mes routes 
 * la methode POST => pour demander au serveur une réponse prenant en compte les données contenues dans le corps de la requête HTTP
 * avant cela on passe au controller 
 */

module.exports = router;// j'export le module