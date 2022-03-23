// == mes requier ==
// j'appel le router de Express
const express = require('express');
const router = express.Router();

// requier de mes controler pour les placer en arguments de mes routes
const controlerUser = require('../controllers/user');



// ===== Mes Routes User=====
router.post('/signup', controlerUser.inscription);


module.exports = router;