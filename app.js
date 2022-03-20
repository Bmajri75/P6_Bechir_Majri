// ======= Express =======
const express = require('express');// je requier express pour la creation de l'app
const morgan = require('morgan');// morgan pour pour un retours des codes status
const mongoose = require('./database/mongoose');//le module mongoose pour la conexion à la base de donnée;

const app = express();// je place dans app le module express

app.use(morgan('dev'));// je configure le package morgan avec une config pré etablie

// ===== Mes Routes =====
app.get('/', (req, res) => {
  res.send('test')
})

// J'export app qui sera appeler sur server.js
module.exports = app;