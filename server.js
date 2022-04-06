/**
 *   ===> fichier point entrer de mon app
 *     ==> Server.js permet de lancer le server
 */

const app = require('./app');//  !je require la configuration de mon module app.js


// ===== lancement du server ======
app.listen(process.env.PORT, () => { // listen ==> methode de lancement (app.listen(path, [callback])) equivalent a http.Server.listen()
  console.log(`Server ouvert sur le PORT : ${process.env.PORT}`);
});