// c'est Ici que vas etre executer toutes les commandes pour ma routes pour Sauces
const saucesModel = require('../models/sauces');
const fs = require('fs'); // ===> files system
const { json } = require('body-parser');



// Cree Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new saucesModel({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // protocole + nom d'auth / nom de fichier 
  });
  sauce.save()
    .then(() => res.status(201).json({ message: `Sauces bien cree` }))
    .catch(err => res.status(400).json({ message: `erreur sur la creation de sauce ===> ${err}` }));
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // protocole + nom d'auth / nom de fichier 
    } : { ...req.body };
  saucesModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce Modifié' }))
    .catch(err => res.status(400).json({ message: `erreur sur la Modification de sauce ===> ${err}` }));
}

exports.singleSauce = (req, res, next) => {
  saucesModel.findOne({ _id: req.params.id })
    .then((sauce => res.status(200).json(sauce)))
    .catch(err => res.status(400).json({ message: `erreur sur la selection d'une sauce ===> ${err}` }));

}

// aficher toutes les sauces
exports.allSauces = (req, res, next) => {
  saucesModel.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ message: `erreur sur l'affichage d'une sauce ===> ${err}` }))
}

// on supprime l'image et ensuite l'objet
exports.deletSauce = (req, res, next) => {
  saucesModel.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        saucesModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
          .catch(err => res.status(400).json({ message: `erreur sur la suppression d'une sauce ===> ${err}` }));
      })
    })
    .catch(err => res.status(500).json({ message: `erreur ${err}` }));

}
