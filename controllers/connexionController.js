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
                    console.log('ECHEC 01', data);
                    res.status(401).json({msg: "Email incorrect !!!"})
                }else{
                    console.log('SUCCES',data)
                    bcrypt.compare(req.body.password, data.password)
                    .then((pass) => {
                        if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                        res.status(200).json({
                            employeId:data._id,
                            reference: data.reference,
                            token: jwt.sign({employeId:data._id, reference: data.reference}, "RANDOM_TOKEN_KEY", {expiresIn: 3600*24} ),
                        })
                    })
                    .catch((error)=> res.status(401).json({msg: error.message}))
                }
            }) 
        } catch (error) {
            console.log('ECHEC 02',error);
            res.status(500).json({msg: error.message})
        }
    }

    static loginEmploye(req, res){
        try {
            Employe.findOne({email: req.body.email, statut: 1})
            .then((data)=>{
                if(!data){
                    res.status(401).json({msg: "Email incorrect !!!"})
                }else{
                 bcrypt.compare(req.body.password, data.password)
                 .then((pass) => {
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    res.status(200).json({
                        employeId:data._id,
                        reference: data.reference,
                        token: jwt.sign({employeId:data._id, reference: data.reference}, "RANDOM_TOKEN_KEY", {expiresIn: 3600*24} ),
                    })
                 })
                 .catch((error)=> res.status(401).json({msg: error.message}))
                }
            }) 
        } catch (error) {
           res.status(500).json({msg: error.message})
        }
    }
}




module.exports = ConnexionController; 

