// == mes requier ==
// j'appel le router de Express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// requier de mes controler pour les placer en arguments de mes routes
const controllerSauces = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

// ===== Mes Routes User=====
router.post('/', auth, multer, controllerSauces.createSauce);
router.get('/', auth, controllerSauces.allSauces);
router.get('/:id', auth, controllerSauces.singleSauce);
router.put('/:id', controllerSauces.modifySauce);
//  router.delete('/:id', controllerSauces.);

// router.post('/:id/like', controllerSauces.);





module.exports = router;