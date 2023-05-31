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
                        token: jwt.sign({userId:data._id,status: data.reference},
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
            Admin.findOne({ _id:req.params.id})
            .then((data)=>{
                if(data){
                    bcrypt.hash(req.body.password,10)
                    .then((hash) => {
                        let updat = {
                            ...req.body,
                            password: hash
                        }
                        Admin.updateOne({_id: req.params.id},{...updat,_id:req.params._id})
                        .then(()=>{
                            res.status(201).json({msg: "Modification effectué avec succès"})})
                        .catch((error)=> res.status(404).json({error: error.message}))
                    })
                    .catch((error)=>res.status(401).json({}))
                }
                else res.status(401).json({msg: "Compte introuvable !!!"})
            })
            .catch((error)=> res.status(404).json({error: error.message}))
            
        } catch (error) {
            
        }
    }
    static async delete (req, res){
        try {
            Admin.deleteOne({_id:req.params.id})
            .then((()=>res.status(201).json({msg:"Admin supprimé !!"})))
            .catch((error)=> res.status(404).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async allRecup(req, res){
        try {
            Admin.find()
            .then((data)=> res.status(201).json({data}))
            .catch((error) => res.status(404).json({error: error.message}));
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async recupId(req,res){
        try {
            Admin.findOne({_id: req.params.id})
            .then((data)=> res.status(201).json({data}))
            .catch((error)=> res.status(404).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

}

module.exports = AdminController;