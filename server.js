// On importe le module express
const express = require('express');
// On importe mongoose après avoir installé
const Mongoose = require('mongoose');
// On crée une instance d'express avec le même nom
const app = express();
// On définit le port sur lequel le server va démarrer
let port = process.env.PORT || 3000;
// On importe nos routes défini dans le fichier indexRouter.js
const indexRoute = require('./routes/indexRouter');
// On défini un midelewere des routage
app.use('/api/',indexRoute);
// On importe la connexion
const {mongoose} = require('./paramConnectDB');
// On écoute le server sur le port 3000 grâce à la méthode listen d'express et on envoie un message. Le message est facultatif
app.listen(port, ()=>{console.log(`Le server est est bien démarré sur le port ${port}. Ouvrez le lient http://localhost:${port} pour voir le message`)});

