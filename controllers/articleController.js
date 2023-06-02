const Article = require('../models/modelArticle');
const Admin = require("../models/modelAdmin")
const Categorie = require('../models/modelCategorie')
const Stocke = require('../models/modelStocke')
class articleController {
    static async create(req, res){
        let reference = 100
        try {
            Article.find({})
            .then(allArticle=>{ // Cette fonctionnalité permet de générer une terminason unique pour la référence de chaque article
                if(allArticle.length > 0){
                    reference = Number(allArticle[allArticle.length-1].reference.split('RTC')[1])+1; // 
                }
            })
            Admin.findOne({_id: req.auth.userId})
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg:"Compte introuvable !!"})
                    return
                }
                Stocke.findOne({_id:req.body.stockes})
                .then((stok) =>{
                    if(!stok){
                        res.status(404).json({msg: "Stocke introuvable !!"})
                        return 
                    }
                    else{
                        Categorie.findOne({_id: req.body.categories})
                        .then((cate)=>{
                            if(!cate){
                                res.status(404).json({msg: "Catégorie introuvable"})
                                return 
                            }
                            else{
                                let article = new Article({
                                    ...req.body,
                                    reference: `ARTC${reference}`, // J'ai jugé bon d'ajouter une reéférence à chaque article ce qui va facilité la recherche à l'oeil nu
                                    montant: req.body.quantite*req.body.prix_unitaire,
                                    stockes:stok._id,
                                    categorie:cate._id,
                                    admin:data._id
                                })
                                article.save()
                                .then((arti)=>{
                                    if(arti){
                                        res.status(200).json({msg: "Produit ajoué !!!"})
                                    }
                                    else{
                                        res.status(400).json({msg: "Une erreur est survenue !!! "})
                                    }
                                })
                                .catch((error)=> res.status(400).json({error: error.message}))
                            }
                        })
                        .catch((error)=> res.status(400).json({error: error.message}))
                    }
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    }
    static async update(req, res){
        Admin.findOne({_id: req.auth.userId})
        .then((data)=>{
            if(!data){
                res.status(500).json({msg: "Compte introuvable !!"})
                return
            }
            
            Article.findOne({_id:req.params.id})
            .then((arti)=>{
                if(!arti){
                    res.status(404).json({msg: "Article introuvable !!"})
                    return
                }
                
                Categorie.findOne({reference: req.body.categorie})
                .then((cate) => {
                    if(!cate){
                        res.status(404).json({msg: "Catégorie introuvable !!"})
                        return
                    }
                    
                    Stocke.findOne({reference: req.body.stockes})
                    .then((stok)=>{
                        if(!stok){
                            res.status(404).json({msg: "Stocke introuvable !!"})
                            return
                        }
                        
                        let article = {
                            ...req.body,
                            stockes: stok._id,
                            categorie: cate._id,
                            admins: data._id
                        }
                        Article.updateOne({_id: req.params.id},{...article, _id:req.params.id})
                        .then((valid)=>{
                            console.log(valid)
                            if(valid){
                                res.status(201).json({msg :"Article modifié !!"})
                            }
                            else{
                                res.status(404).json({msg:"Une erreur est survenue !!"})
                            }
                        })
                        .catch((error)=> res.status(400).json({error: error.json}))
                    })
                    .catch((error)=> res.status(400).json({error: error.message}))
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=>res.status(500).json({error:error.message}))
    }
    static  async read(req,res){
        Admin.findOne({_id: req.auth.userId})
        .then((data)=>{
            if(!data){
                res.status(404).json({msg: "Compte introuvable !!"})
                return
            }
            Article.findOne({_id: req.params.id})
            .then((article)=> res.status(201).json({article}))
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static  async readAll(req,res){
        Admin.findOne({_id: req.auth.userId})
        .then((data)=>{
            if(!data){
                res.status(404).json({msg: "Compte introuvable !!"})
                return
            }
            Article.find()
            .then((article)=> res.status(201).json({article}))
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
    }
    static async delete(req, res){
        try {
            Admin.findOne({_id: req.auth.userId})
        .then((data)=>{
            if(!data){
                res.status(404).json({msg: "Compte introuvable !!"})
                return
            }
            Article.deleteOne({_id: req.params.id})
            .then(()=> res.status(201).json({msg: "Article supprimé !!"}))
            .catch((error)=> res.status(400).json({error: error.message}))
        })
        .catch((error)=> res.status(400).json({error: error.message}))
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = articleController;