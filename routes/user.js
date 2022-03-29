// == mes requier ==
// j'appel le router de Express
const express = require('express');
const router = express.Router();

// requier de mes controler pour les placer en arguments de mes routes
const controllerUser = require('../controllers/user');


// ===== Mes Routes User=====
// le meme URI pour toutes mes requettes  
router.post('/signup', controllerUser.inscription);// inscription URL = URI + endpoint
router.post('/login', controllerUser.login);//conexion


module.exports = router;