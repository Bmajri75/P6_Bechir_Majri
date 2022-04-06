// == mes requier ==
// j'appel le router de Express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// requier de mes controler pour les placer en arguments de mes routes
const controllerSauces = require('../controllers/sauces');// je recupere mes controler pour argumenter mes routes
const multer = require('../middleware/multer-config'); // recupere la configuration de multer
// multer permet l'envoie et la recuperation des fichiers et image

// ===== Mes Routes User=====
router.post('/', auth, multer, controllerSauces.createSauce);
router.get('/', auth, controllerSauces.allSauces);
router.get('/:id', auth, controllerSauces.singleSauce);
router.put('/:id', auth, multer, controllerSauces.modifySauce);
router.delete('/:id', auth, controllerSauces.deletSauce);
router.post('/:id/like', auth, controllerSauces.likeSauces);

/**
 * fonctionnement de mes routes Post Get Put Delet
 *  POST =>demande une reponse avec prise en compte de se que je lui envoie
 *   GET => demande une resource
 * PUT =>  Modification 
 * DELETE => efface 
 * avant cela on passe place le middleware auth pour verifier les token
 * ensuite on vas au controller pour toutes la logique metier
 */

module.exports = router;