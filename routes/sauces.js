// == mes requier ==
// j'appel le router de Express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// requier de mes controler pour les placer en arguments de mes routes
const controllerSauces = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

// ===== Mes Routes User=====
router.post('/', multer, controllerSauces.createSauce);
router.get('/', controllerSauces.allSauces);
//  router.get('/:id', controllerSauces.);
//  router.put('/:id', controllerSauces.);
//  router.delete('/:id', controllerSauces.);

// router.post('/:id/like', controllerSauces.);





module.exports = router;