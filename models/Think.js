// requier de mongoose pour gerer les envoie à la BD
const mongoose = require('mongoose');


// le shema pour envoie en Bd, il sera rempli par le front
const thinkShema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacture: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  userId: { type: [String] },
})


module.exports = mongoose.model('Think', thinkShema);