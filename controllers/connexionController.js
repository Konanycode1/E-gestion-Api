const Employe = require('../models/modelEmploye')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ConnexionController{
    static async login(req, res){
        try {
            Employe.findOne({email: req.body.email, statut: 1})
            .then((data)=>{
                if(data.length === 0){
                    res.status(401).json({msg: "Email incorrect !!!"})
                }else{
                 bcrypt.compare(req.body.password, data.password)
                 .then((pass) => {
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    res.status(200).json({
                        employeId:data._id,
                        status: data.reference,
                        token: jwt.sign({employeId:data._id, status: data.reference}, "RANDOM_TOKEN_KEY", {expiresIn: 3600*24} )
                    })
                 })
                 .catch((error)=> res.status(401).json({error: error.message}))
                }
            }) 
        } catch (error) {
           res.status(500).json({msg: error.message})
        }
    }
}

module.exports = ConnexionController; 


