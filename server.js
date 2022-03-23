const app = require('./app');// je recupere la configuration de mon module app.js

// ===== lancement du server ======
app.listen(process.env.PORT, () => {
  console.log(`Server ouvert sur le PORT : ${process.env.PORT}`);// le serveur sera lu sur le port PORT de la variable d'environement
})


// voir la video sur le CORS de egeniclimatique n 141