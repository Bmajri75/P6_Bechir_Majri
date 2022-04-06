// c'est Ici que vas etre executer toutes les commandes pour ma routes pour Sauces
const saucesModel = require('../models/sauces');
const fs = require('fs'); // ===> files system



// Cree Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce) // je recupere les information entrer sur le front et je les JSON 
  const sauce = new saucesModel({// je cree une instance appeler sauce qui reprend les information du front
    ...sauceObject, //... permet de tout selectionnée
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // je rajoute l'image ==>  protocole + nom d'auth / nom de fichier 
  });
  sauce.save()
    .then(() => res.status(201).json({ message: `Sauces bien cree` }))
    .catch(err => res.status(400).json({ message: `erreur sur la creation de sauce ===> ${err}` }));
}

// modifie une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? // operateur ternair condition ? exprSiVrai : exprSiFaux
    {
      // condition VRAI il a modifier l'image
      ...JSON.parse(req.body.sauce),// on recurepe toutes les nouvelle info entrer au front 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // recupere la nouvelle image ==> protocole + nom d'auth / nom de fichier 
    } :
    // si FAUX il n'a pas modifier l'image
    { ...req.body };
  saucesModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // on compare {arg 1 objet de comparaison}  {arg 2 le nouvelle objet a envoyer }
    .then(() => res.status(200).json({ message: 'Sauce Modifié' }))
    .catch(err => res.status(400).json({ message: `erreur sur la Modification de sauce ===> ${err}` }));
}

//aficher une sauces
exports.singleSauce = (req, res, next) => {
  saucesModel.findOne({ _id: req.params.id }) //recherche une sauce avec son id qui est dans l'URL
    .then((sauce => res.status(200).json(sauce)))
    .catch(err => res.status(400).json({ message: `erreur sur la selection d'une sauce ===> ${err}` }));

}

// aficher toutes les sauces
exports.allSauces = (req, res, next) => {
  saucesModel.find() // recherche dans la base de donné toutes les sauces
    .then(sauces => res.status(200).json(sauces))
    .catch(err => res.status(400).json({ message: `erreur sur l'affichage d'une sauce ===> ${err}` }))
}

// on supprime l'image et ensuite l'objet
exports.deletSauce = (req, res, next) => {
  saucesModel.findOne({ _id: req.params.id })// on recherche le ID qui est dans la requetes des URL
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; //je recupere  le 2 eme element du split le nom du fichier 
      fs.unlink(`images/${filename}`, () => { // => fs.unlink permet de suprimer un fichier qui est placer en callback
        saucesModel.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
          .catch(err => res.status(400).json({ message: `erreur sur la suppression d'une sauce ===> ${err}` }));
      })
    })
    .catch(err => res.status(500).json({ message: `erreur ${err}` }));

}


// les Likes 
exports.likeSauces = (req, res, next) => {
  switch (req.body.like) // je recupere le choix de lutilisateur -1, 1 ou 0
  {
    //  pour le choix 1 
    case 1:
      // je recupere la cle _id et sa valeur pour travailler dessu
      saucesModel.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 }, // j'incremente ma cle likes de 1 
        $push: { usersLiked: req.body.userId },// je rajoute l'ID de mon utilisateur dans le tableau
      })
        .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
        .catch((err) => { res.status(400).json({ err }); });
      break;

    case 0:
      saucesModel.findOne({ _id: req.params.id }) // je recherche dans la Database la sauce avec l'ID recuperer dans les parametre de la requette ( dans URL)
        .then((objet) => { // une foi trouver je recupere une promise avec tout l'objet 


          // je parcour les ID qui sont dans usersLiked 
          // si sa match avec le userId de l'actuel utilisateur j'execute le code
          if (objet.usersLiked.find(user => user === req.body.userId)) {
            saucesModel.updateOne({ _id: req.params.id }, {  // mise a jours de la sauce avec l'ID recuperer dans les parametre
              $inc: { likes: -1 }, // j'enleve 1 au like 
              $pull: { usersLiked: req.body.userId }, // et j'enleve mon Id de usersLiked
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((err) => { res.status(400).json({ err }); });

          } if (objet.usersDisliked.find(user => user === req.body.userId)) {
            saucesModel.updateOne({ _id: req.params.id }, {  // mise a jours de la sauce avec l'ID recuperer dans les parametre
              $inc: { dislikes: -1 }, // j'enleve 1 au dislike 
              $pull: { usersDisliked: req.body.userId }, // et j'enleve mon Id de usersdisliked
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((err) => { res.status(400).json({ err }); });

          }
        })
        .catch((err) => { res.status(404).json({ err }); });
      break;

    case -1:
      // je recupere la cle _id et sa valeur pour travailler dessu
      saucesModel.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 }, // j'incremente ma cle dislikes de 1 
        $push: { usersDisliked: req.body.userId },// je rajoute l'ID de mon utilisateur dans le tableau dislikes
      })
        .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
        .catch((err) => { res.status(400).json({ err }); });
      break;
    default:
      console.err(' ERREUR ')
  }
}