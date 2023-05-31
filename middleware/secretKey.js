let jwt = require('jsonwebtoken');
let privateKey = require('./private_key');
module.exports = (req, res, next) => {
    console.log("++++++++++++++++++++++++++++++++")
    let authorizationHeader = req.headers.authorization; // On récupère l'en-tête http normée authorization. C'est dans cette en-tête qu'on va transister le jeton jwt envoyé par les utilisateur
    if(!authorizationHeader) { // On vérifie si le jeton a été bien fournit
        let message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }
    let token = authorizationHeader.split(' ')[1]; // On récupère le jeton jwt envoyé par l'utilisateur dans la variable token 
    let decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => { // On vérifie si le jeton est bien valide grâce à la méthode verify(). Elle est complementaire à la méthde sign()
        if(error) {
            let message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
            return res.status(401).json({ message, data: error });
        }
        let id_admin = decodedToken.id_admin
        if (req.body.id_admin && req.body.id_admin !== id_admin) {
            let message = `L'identifiant de l'utilisateur est invalide.`;
            res.status(401).json({ message });
        } else {
            next();
        }
    })
}