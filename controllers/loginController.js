let Admin = require('../models/modelAdmin')
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let privateKey = require('../middleware/private_key');
const dataSession = "";
class LoginController {
    static async login(req, res){
    Admin.findOne({email: req.body.email})
    .then(admin => {
      if(!admin){
        const message = "Ce compte n'existe pas."
        return res.status(400).json({message})
      }
      bcrypt.compare(req.body.password, admin.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrecte.`;
          return res.status(400).json({ message })
        }
        // Jsonwebtoken (jeton)
        let token = jwt.sign( // On génère le jeton jwt avec la méthode sign() du modue jsonwebtoken
          {id_admin: admin.id},
          privateKey,
          {expiresIn: '24h'}
        );
        const message = `La connexion a été connecté avec succès`;
        dataSession = { data: admin, token }
        return res.json({ message, data: admin, token })
      })
    })
    .catch(error => {
      const message = "Connexion échouée. Réessayez dans quelques instant.";
      return res.json({message})
    })
  }
}

module.exports = LoginController;