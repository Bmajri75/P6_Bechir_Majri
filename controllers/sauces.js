// c'est Ici que vas etre executer toutes les commandes pour ma routes pour Sauces
const saucesModel = require('../models/sauces');


// Cree Sauce
exports.crateSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id; // je supprime le id cree au prealable
  const sauce = new saucessaucesModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/vue/images/${req.file.filename}`
  });
  saucesModel.save()
    .then(() => res.status(201).json({ messag: 'Sauce Cree' }))
    .catch(err => res.status(400), json({ err }));
}


exports.allSauces = (req, res) => {
  saucesModel.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ err }))
}


// ecrire la methode save pour envoyer a la Bd

// faire afficher la BD 

// routes / sauces