// requier de mongoose pour gerer les envoie à la BD
const mongoose = require('mongoose');


// le shema pour envoie en Bd, il sera rempli par le front
const sauceShema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false }
})


module.exports = mongoose.model('sauces', sauceShema);