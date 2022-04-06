/**
 *  ==> auth.js
 * ! ==>  ce fichier contien la configuration de mon Authantification
 * 
 */

//* ==== require jsonwebtoken ===
const jswtoken = require('jsonwebtoken');


// middleware que j'export pour le rappeler sur mes routes sauces
module.exports = (req, res, next) => {
  // je fait un try catch pour recuperer les erreur 
  try {
    const token = req.headers.authorization.split(' ')[1]; // je recupere mon token du header
    const decodeur = jswtoken.verify(token, process.env.TOKEN_CODE); // je verifier si le token est envoyer par le meme user ici je recois un objet
    const userId = decodeur.userId; // je recupere le user id en claire

    // si le userId du body et bien present et que celui ci est different de UserID dans le decodeur
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable ! '; // le user ID est pas valable on s'arrete immediatement il passe directement au Catch
    } else {
      next(); // sinon tout est ok et on renvoie au prochaine middlewar
    }
  } catch { // si erreur dans ma condition le throw renvoi ici et je recupere une erreur 403 Forbidden => il refuse d'executer mais il a bien compris la req
    res.status(403).json({
      error: new Error(' requete pas authorisé.') // j'utilise le constructor Error pour renvoyer l'erreur
    })
  }
};

