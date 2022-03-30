// c'est Ici que vas etre executer toutes les commandes pour ma routes pour Sauces
const saucesModel = require('../models/sauces');


// Cree Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new saucesModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ messag: 'Sauce Cree' }))
    .catch(err => res.status(400).json({ err }));
}

// aficher toutes les sauces
exports.allSauces = (req, res, next) => {
  saucesModel.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }))
}


// ecrire la methode save pour envoyer a la Bd

// faire afficher la BD 

// routes / sauces