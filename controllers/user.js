// c'est Ici que vas etre executer toutes les commandes pour ma routes 
const bcrypt = require('bcrypt'); // bcrypt pour hashage des mots de passe
const jswtoken = require('jsonwebtoken');

// je recupere les model cree 
const userModel = require('../models/Users');

// FONCTION POUT L'inscription
exports.inscription = (req, res, next) => {

  // hachage du Mdp 
  bcrypt.hash(req.body.password, 10)// hashage 10
    .then((hash) => {
      // je cree une instance du model cree c'est a dir Users qui est dans la constante userModel
      const user = new userModel({
        email: req.body.email,// l'operateur vas recuperer tout ce qui peut etre envoyer dans les champs dans le body et detail seul les titre email etc..
        password: hash
      });

      user
        .save() // methode qui envoie a la dataBase l'instance de userModel
        .then(() => res.status(201).json({ message: 'Profil Crèe !' })) // la response si tout vas bien
        .catch(err => res.status(400).json({ err }));//la reponse si tout vas mal
    })
    .catch((err) => {
      res.status(500).json({ err });
    })// capture err 500 en cas d'erreur serveur
};


// FONCTION POUR CONEXION
exports.login = (req, res, next) => {
  userModel.findOne({ email: req.body.email })// je recherche le mail entrer dans la Bd
    .then((utilisateur) => {// celui ci sera dans une reponse "utilisateur"
      if (!utilisateur) { // si selui ci est fals  retourn 
        return res.status(401).json({ error: 'utilisateur introuvable' })
      }
      // verification du password
      bcrypt.compare(req.body.password, utilisateur.password)

        .then((reponseVerif) => {
          console.log(reponseVerif)

          if (!reponseVerif) {
            return res.status(401).json({ error: 'Le password est incorect' })
          }

          res.status(200).json({
            // mise en place du token pour le suivie de qui peut faire, le userId et le token seron liee
            userId: utilisateur._id,
            token: jswtoken.sign(
              { userId: utilisateur._id }, // userID prend le ID de l'user
              process.env.TOKEN_CODE,
              { expiresIn: "24h" }
            )
          })

        })
        .catch((error) => { res.status(500).json({ error }) })
    })
    .catch((err) => { res.status(500).json({ err }) })
}