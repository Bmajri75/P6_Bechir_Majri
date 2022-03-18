// je requier express & mongoose
const express = require('express');
const mongoose = require('mongoose');
// je place dans app le module express
const app = express();

// conexion a mongoDb
mongoose.connect('mongodb+readWriteAnyDatabase@admin://jimbob:Techwin75020@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// 3000 est le port sur le quel va tourner mon server;
const port = 3000;

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Server ouvert sur le PORT : ${port}`)
})

module.exports = app;