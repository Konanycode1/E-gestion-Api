const Employe = require('../models/modelEmploye');
const Admin = require('../models/modelAdmin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ConnexionController{
    static loginAdmin(req, res){
        try {
            Admin.findOne({email: req.body.email, statut: 1})
            .then((data)=>{
                
                if(!data){
                    res.status(401).json({msg: "Email incorrect !!"})
                }else{
                    bcrypt.compare(req.body.password, data.password)
                    .then((pass) => {
                        if(!pass){
                            res.status(401).json({msg:"Mot de passe incorrect !!"});
                        }else{
                            console.log('SUCCES',data)
                            res.status(200).json({
                                msg:'Connexion établie avec succès.',
                                user:data,
                                userId:data._id,
                                reference: data.reference,
                                token: jwt.sign({userId:data._id, reference: data.reference}, "RANDOM_TOKEN_KEY", {expiresIn: 3600*24} ),
                            })
                        }
                        
                    })
                    .catch((error)=> res.status(401).json({msg:'Connexion non établie, incorrect !!', error: error.message}))
                }
            }) 
        } catch (error) {
            console.log('ECHEC 02',error);
            res.status(500).json({msg:'Connexion non établie, incorrect !!', error: error.message})
        }
    }

    static loginEmploye(req, res){
        try {
            Employe.findOne({email: req.body.email, statut: 1})
            .then((data)=>{
                if(!data){
                    res.status(401).json({msg: "Email incorrect !!"})
                }else{
                 bcrypt.compare(req.body.password, data.password)
                 .then((pass) => {
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    res.status(200).json({
                        msg:'Connexion établie avec succès.',
                        user:data,
                        userId:data._id,
                        reference: data.reference,
                        token: jwt.sign({userId:data._id, reference: data.reference}, "RANDOM_TOKEN_KEY", {expiresIn: 3600*24} ),
                    })
                 })
                 .catch((error)=> res.status(401).json({msg:'Connexion non établie, incorrect !!', error:error.message}))
                }
            }) 
        } catch (error) {
           res.status(500).json({msg:'Connexion non établie, incorrect !!', error: error.message})
        }
    }
}




module.exports = ConnexionController; 


