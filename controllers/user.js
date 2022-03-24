// c'est Ici que vas etre executer toutes les commandes pour ma routes 
const bcrypt = require('bcrypt'); // bcrypt pour hashage des mots de passe

// je recupere les model cree 
const userModel = require('../models/Users');

// FONCTION POUT L'inscription
exports.inscription = (req, res, next) => {
  delete req.body._id;// on supprime le champs Id qui sera cree automatiquement avent de cree mon instance

  // hachage du Mdp 
  bcrypt.hash(req.body.password, 10)// hashage 10
    .then((hash) => {
      // je cree une instance du model cree c'est a dir Users qui est dans la constante userModel
      const user = new userModel({
        email: req.body.email,// l'operateur vas recuperer tout ce qui peut etre envoyer dans les champs dans le body et detail seul les titre email etc..
        password: hash
      });
      user.save() // methode qui envoie a la dataBase l'instance de userModel
        .then(() => res.status(201).json({
          message: 'Profil Crèe !'
        })) // la response si tout vas bien
        .catch(err => res.status(400).json({ err }));//la reponse si tout vas mal
    })
    .catch((err) => {
      res.status(500).json({ err }) // capture err 500 en cas d'erreur serveur
    })

};


// FONCTION POUR CONEXION
exports.login = (req, res, next) => {
  userModel.findOne({ email: req.body.email })
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(401).json({ error: 'utilisateur introuvable' })
      }



      bcrypt.compare(req.body.password, utilisateur.password)
        .then((reponseCheik) => {
          console.log(reponseCheik)
          if (!reponseCheik === true) {
            return res.status(401).json({ error: 'Le password est incorect' })
          } else {
            return res.status(200).json({ message: ' vous pouvez entrer' })
          }
        })
        .catch((err) => {
          res.status(500).json({ err })
        })
    })
    .catch((err) => { res.status(500).json({ err }) })


}