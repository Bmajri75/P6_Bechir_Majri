// ======= Epress =======
// je requier express
const express = require('express');
// je place dans app le module express
const app = express();
// 3000 est le port sur le quel va tourner mon server;
const port = 3000;

//===== GESTION DataBase ====
// requiere Mongoose
const mongoose = require('mongoose');

// conexion a mongoDb
mongoose.connect(`mongodb+srv://bmajri:Techwin75020@cluster0.6jkmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

// ===== mes Routes =====
app.get('/', (req, res) => {
  res.send('test')
})
// ===== lancement du server ======
app.listen(port, () => {
  console.log(`Server ouvert sur le PORT : ${port}`)
})


module.exports = app;