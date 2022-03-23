// c'est Ici que vas etre executer toutes les commandes pour ma routes 

// je recupere les model cree 
const userModel = require('../models/Users');

exports.inscription = (req, res, next) => {

  delete req.body._id;// on supprime le champs Id qui sera cree automatiquement avent de cree mon instance

  // je cree une instance du model cree c'est a dir Users qui est dans la constante userModel
  const user = new userModel({
    ...req.body // l'operateur vas recuperer tout ce qui peut etre envoyer dans les champs dans le body et detail seul les titre email etc..
  });
  user.save() // methode qui envoie a la dataBase l'instance de userModel
    .then(() => res.status(201).json({
      message: 'Profil Cree !'
    })) // je capture la response 
    .catch(error => res.status(400).json(`il y'a une erreur ${error}`)); // je capture l'erreur et je l'affiche en Json

  console.log(user);

}