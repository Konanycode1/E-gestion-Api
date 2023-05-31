const Stocke = require('../models/modelStocke');
const Admin = require('../models/modelAdmin');
const auth = require('../middleware/auth');
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
                    .catch((error)=> res.status(401).json({error: error.message}))
                }
            }).catch((error)=> res.status(500).json({error: error.message}))
           
        } catch (error) {
            console.log(error.massege, 'erer');
            res.status(500).json({message: error.massege})
        }
    }
}
module.exports = StockeController;