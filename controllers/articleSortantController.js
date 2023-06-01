const ArticleSortant = require('../models/modelArticleSortant');
const Article = require('../models/modelArticle');
const Employe = require('../models/modelEmploye');

class ArticleSortantController{
    static async create(req, res){
        let reference = 100;
        try {
            ArticleSortant.find({})
            .then(allArticleSortant=>{
                if(allArticleSortant.length > 0){
                    reference = Number(allArticleSortant[allArticleSortant.length-1].reference.split('ORT')[1])+1;
                }
            })
            Employe.findOne({_id: req.empAuth.employeId})
            .then(empl=>{
                if(!empl) {
                    res.status(401).json({msg: 'Veuillez-vous connecter pour pouvoir effectuer cette action'});
                    return
                }
                
                Article.findOne({_id: req.body.id})
                .then(article=>{
                    if(!article){
                        res.status(400).json({msg: "Ce article n'est pas disponible"});
                        return
                    }
                    if(article.quantite < req.body.quantite || article.quantite === 0) {
                        res.status(400).json({msg: "La quantité est insuffisante, veuillez donc réduire la quantité !"});
                        return ;
                    }
                    
                    let articleSortant = new ArticleSortant({
                        reference: `ARSOT${reference}`,
                        libelle: article.libelle,
                        quantite: req.body.quantite,
                        prix_unitaire: article.prix_unitaire,
                        montant: req.body.quantite*article.prix_unitaire,
                        stockes: article.stockes,
                        categorie: article.categorie,
                        articles: article._id,
                        employes: empl._id
                    });
                    articleSortant.save()
                    .then(artSort=>{
                        Article.findOne({_d:req.body.articles, statut:1})
                        .then((art)=>{
                            if(art){
                                let updat = {
                                    quantite: article.quantite - artSort.quantite,
                                    montant: article.montant - artSort.montant,
                                    employes: empl._id
                                };
                                if(updat.quantite === 0){
                                    updat.etat = false;
                                    updat.statut = 2;
                                }
                                Article.updateOne({_id: req.body.id},updat)
                                .then((newArt)=>{
                                    console.log('newArt',newArt);
                                    res.status(201).json({msg: "Modification effectué avec succès", newArt: newArt});
                                })
                                .catch((error)=> {
                                    console.log('error',error);
                                    res.status(404).json({error: error.message});
                                })
                            }else{
                                console.log('Compte introuvable');
                                res.status(401).json({msg: "Compte introuvable !!!"});
                            }
                        })
                    })
                })
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ArticleSortantController