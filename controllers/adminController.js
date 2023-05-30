const Admin = require('../models/modelAdmin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class AdminController {
    static async create(req, res){
        try {
            Admin.findOne({email: req.body.email})
            .then((data) =>{
                if(!data){
                    if(req.body.telephone.length >= 10){
                        bcrypt.hash(req.body.password, 10)
                        .then((hash)=>{
                            let admin = new Admin({
                                ... req.body,
                                password: hash
                            })
                            admin.save()
                            .then(()=> res.status(201).json({msg:"admin créé avec succès"}))
                            .catch((error)=> res.status(401).json({error:error.message}))
                        })
                        .catch((error)=>res.status(401).json({error:error.message}))
                    }
                    else{
                        res.status.json({msg: "Numéro trop court"})
                    }
                }
                else{
                    res.status(401).json({msg:"Cet compte existe déjà, veuillez vous connectez"})
                }
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async login(req, res){
        try {
            Admin.findOne({email: req.body.email})
            .then((data)=>{
                if(!data){
                    res.status(401).json({msg: "Email incorrect !!!"})
                }
                else{
                 bcrypt.compare(req.body.password, data.password)
                 .then((pass) => {
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    res.status(200).json({
                        userId:data._id,
                        status: data.reference,
                        token: jwt.sign({adminId:data._id},
                            "RANDOM_TOKEN_KEY",
                            {expiresIn: 3600*24}
                            )
                    })
                 })
                 .catch((error)=> res.status(401).json({error: error.message}))
                }
            }) 
        } catch (error) {
           res.status(500).json({msg: error.message})
        }
    }


    static async update(req,res){
        try {
            Admin.findOne({ email: req.body.email})
            .then((data)=>{
                if(data){
                    let updat = {
                        email: email,
                        ...req.body
                    }
                    Admin.updateOne({email: req.body.email},{...updat,email:req.body.email})
                    .then(()=> res.status(201).json({msg: "Modification effectué avec succès"}))
                }
                else res.status(401).json({msg: "Compte introuvable !!!"})
            })
            .catch((error)=> res.status(404).json({error: error.message}))
            
        } catch (error) {
            
        }
    }

}

module.exports = AdminController;