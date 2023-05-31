const Stocke = require('../models/modelStocke');
const Admin = require('../models/modelAdmin');
const auth = require('../middleware/auth');
const { json } = require('express');
class StockeController {
    static async create(req, res){
        let reference = 100;
        try {
            Stocke.find({})
            .then(allStocke=>{
                if(allStocke.length > 0){
                    reference = Number(allStocke[allStocke.length-1].reference.split('K')[1])+1;
                }
            })
            Admin.findOne({_id:req.auth.userId})
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Cet compte est introuvable , Veuillez vous connecter à nouveau"})
                    return
                }
                else{
                    let stok = new Stocke ({
                        libelle:req.body.libelle,
                        reference:`STOCK${reference}`,
                        montant: req.body.montant,
                        satut:1,
                        etat: true,
                        admins:data._id
                    })
                    stok.save()
                    .then(()=> res.status(200).json({msg: "Stocke ajouté !!"}))
                    .catch((error)=> res.status(401).json({error: error.message}));
                }
            })
            .catch((error)=> res.status(500).json({error: error.message}));
           
        } catch (error){
            res.status(500).json({message: error.massege});
        }
    }

    static async read(req, res){
        try{
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(admin){
                    Stocke.find({statut:1})
                    .then(allStocke=> {
                        const msg = `Il y'a ${allStocke.length} élémnents disponible(s).`;
                        res.status(200).json({msg: msg, data: allStocke});
                    })
                    .catch((error)=>{
                        const msg = "Aucun élément trouvé";
                        res.status(400).json({msg: msg, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            
        }catch(error){
            res.status(500).json({data: error.message});
        }
    }

    static async indexById(req, res){ // On trouve en fonction de la cle primière du stocke
        try{
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(admin){
                    Stocke.findById(req.params.id)
                    .then(stock=>{
                        if(stock.length===0 || stock.statut === 0){
                            const msg = `Le stocke dont l'identifiant est ${req.params.id} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: stock});
                        }
                    })
                    .catch((error)=>{
                        const msg = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: msg, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.statut(500);json({error: error.message});
            })
        }catch(error){
            const msg = `URL non valable`;
            res.status(500).json({msg: msg, data: error.message});
        }
    }

    static async indexByRef(req, res){  // On trouve en fonction de la référence du stocke
        try{
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(admin){
                    Stocke.find({reference: req.params.reference})
                    .then(stock=>{
                        if(stock.length===0 || stock.statut === 0){
                            const msg = `Le stocke dont l'identifiant est ${req.params.reference} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: stock});
                        }
                    })
                    .catch((error)=>{
                        const msg = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: msg, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.statut(500);json({error: error.message});
            })
        }catch(error){
            const msg = `URL non valable.`;
            res.status(500).json({msg: msg,data: error.message});
        }
    }


    // static async update(req, res){
    //     try{
    //         Admin.findOne({_id:req.auth.userId})
    //         .then(admin=>{
    //             if(admin){
    //                 Stocke.findByIdAndUpdate(
    //                     req.body.id,
    //                     {
    //                         libelle: req.body.libelle,
    //                         montant: req.body.montant,
    //                         admins: req.body.admins
    //                     },
    //                     {new: true},
    //                     function(error, stock){
    //                         if(error){
    //                             console.log('Une erreur est survenue lors de la modification des données', error);
    //                             res.status(500).json({data: error.message})
    //                         }else{
    //                             cosnsole.log('Modification effectuée avec succès', stock);
    //                             const msg = 'Modification effectuée avec succès';
    //                             res.status(200).json({msg: msg, data: stock});
    //                         }
    //                     }
    //                 )
    //             }
    //         })
    //         .then(error=>{
    //             console.log('Vous n\'avez toutes les autorisation pour effectuer cette caction. Veuillez donc vous authentifier !', error);
    //             const msg = 'Vous n\'avez toutes les autorisation pour effectuer cette caction. Veuillez donc vous authentifier !';
    //             res.status(500).json({msg: msg, data: error.message})
    //         })
    //     }catch(errer){
    //         // 
    //     }
    // }
}
module.exports = StockeController;