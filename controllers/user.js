// c'est Ici que vas etre executer toutes les commandes pour ma routes 
const bcrypt = require('bcrypt'); // bcrypt pour hashage des mots de passe

// je recupere les model cree 
const userModel = require('../models/Users');

exports.inscription = (req, res, next) => {
  delete req.body._id;// on supprime le champs Id qui sera cree automatiquement avent de cree mon instance

  // hachage du Mdp 
  bcrypt.hash(req.body.password, 10)// hashage 10
    .then((hash) => {

      // je cree une instance du model cree c'est a dir Users qui est dans la constante userModel
      const user = new userModel({
        ...req.body,// l'operateur vas recuperer tout ce qui peut etre envoyer dans les champs dans le body et detail seul les titre email etc..
        password: hash
      });
      user.save() // methode qui envoie a la dataBase l'instance de userModel
        .then(() => res.status(201).json({
          message: 'Profil Crèe !'
        })) // la response si tout vas bien
        .catch(error => res.status(400).json({ error } // la reponse si tout vas mal
          .send(console.log(` il y'a une erreur ${error}`))));// avec un msg dans la console
    })

};