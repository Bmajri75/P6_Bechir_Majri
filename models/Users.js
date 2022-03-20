// requier de mongoose pour gerer les envoie à la BD
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})


module.exports = mongoose.model("Users", userSchema);

// model de l'utilisateur vue sur OC video cours NodeJS
/**
 * La méthode  Schema  de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.
 * La méthode  model  transforme ce modèle en un modèle utilisable.
 */