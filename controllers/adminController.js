const Admin = require('../models/modelAdmin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
class AdminController {
    static async save(req, res){
        try {
            console.log('++++++++++++++++++++++++++++++++++++++++++',req.body)
            let reference = 100;
            Admin.find({})
            .then(allAdmin=>{ // Cette fonctionnalité permet de générer une terminason unique pour la référence de chaque Admin
                if(allAdmin.length > 0){
                    reference = Number(allAdmin[allAdmin.length-1].reference.split('MIN')[1])+1; //
                }
                Admin.findOne({email: req.body.email})
                .then((data) =>{
                    if(!data){

                        console.log('++++++++++++++++++++++++++++++++++++++++++',req.body)
                        const chiffres = `0123456789`;
                        Admin.findOne({_id: req.auth.userId, statut:1})
                        .then(item=>{
                            if(!item){
                                res.status(400).json({msg:`Vous n'êtes pas autorisé à éffectuer cette réquette. Veuillez vous connecter`})
                            }else{
                                
                                if(req.body >= 10 && req.body.telephone.split("").every(item=>chiffres.includes(item))){
                                    req.body.password = `123456`;
                                    bcrypt.hash(req.body.password, 10)
                                    .then(async hash=>{
                                        let admin =  new Admin({
                                            ... req.body,
                                            modifierPar: `${item._id}@${item.nomPrenom}`,
                                            reference: `ADMIN${reference}`,
                                            password: hash,
                                            createdAt: new Date(),
                                            updatedAt: new Date()
                                        });
                                        admin.$timestamps();
                                        await admin.save()
                                        .then(resp=>{return res.status(200).json({msg:"Admin ajouté avec succès", data: resp})})
                                        .catch(er=>{return res.status(400).json({msg:er.message})})
                                    })
                                    .catch((error)=>{return res.status(400).json({msg:error.message})})
                                }else{
                                    return res.status(400).json({msg: "Numéro trop court ou le numéro doit constituer uniquement que des chiffres."});
                                }
                            }
                        })
                    }
                    else{
                    res.status(401).json({msg:"Cet administrateur est déjà ajouté."})
                    }
                })
            })
            
        } catch (error) {
            res.status(500).json({msg: error.message})
            
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
                        msg: `Connexion établie avec succès !`,
                        userId:data._id,
                        reference: data.reference,
                        token: jwt.sign(
                            {userId:data._id, reference: data.reference},
                            "RANDOM_TOKEN_KEY",
                            {expiresIn: 3600*24}
                        )
                    })
                 })
                 .catch((error)=> res.status(401).json({msg: error.message}))
                }
            }) 
        } catch (error) {
           res.status(500).json({msg: error.message})
        }
    }

    static async updateForSuperAdmin(req,res){
        try {
            Admin.findOne({_id: req.auth.userId, statut:1})
            .then(user=>{
                if(!user) return res.status(500).json({msg: `Vous n'êtes pas autorisé à effectuer cette réquette.`});
                Admin.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        let updat = {...req.body, modifierPar: `${user._id}@${user.nomPrenom}`,updatedAt: new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}
                        Admin.updateOne({_id: req.body.id},{...updat})
                        .then(()=>{res.status(200).json({msg: "Modification effectué avec succès"})})
                        .catch((error)=> res.status(404).json({msg: error.message}));
                    }
                    else res.status(401).json({msg: "Compte introuvable !!!"})
                })
                .catch((error)=> res.status(404).json({msg: error.message}))
            })
        } catch (error) {
            console.log(2345);
        }
    }

    static async update(req,res){
        try {
            Admin.findOne({ _id:req.body.id})
            .then((data)=>{
                if(data){
                    bcrypt.hash(req.body.password,10)
                    .then((hash) => {
                        let updat = {
                            ...req.body,
                            password: hash,
                            updatedAt: new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })
                        }
                        Admin.updateOne({_id: req.params.id},{...updat,_id:req.params._id})
                        .then(()=>{
                            res.status(201).json({msg: "Modification effectué avec succès"})})
                        .catch((error)=> res.status(404).json({msg: error.message}))
                    })
                    .catch((error)=>res.status(401).json({}))
                }
                else res.status(401).json({msg: "Compte introuvable !!!"})
            })
            .catch((error)=> res.status(404).json({msg: error.message}))
            
        } catch (error) {
            
        }
    }
    
    static async delete (req, res){
        try {
            Admin.deleteOne({_id:req.params.id})
            .then((()=>res.status(201).json({msg:"Admin supprimé !!"})))
            .catch((error)=> res.status(404).json({msg: error.message}))
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }

    static async allRecup(req, res){
        try {
            Admin.find({statut:1})
            .then((data)=> res.status(201).json({data}))
            .catch((error) => res.status(404).json({msg: error.message}));
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }

    static async recupId(req,res){
        try {
            Admin.findOne({_id: req.params.id, statut:1})
            .then((data)=> res.status(201).json({data}))
            .catch((error)=> res.status(404).json({msg: error.message}))
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}

module.exports = AdminController;