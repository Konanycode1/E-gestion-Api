const Stocke = require('../models/modelStocke');
const Admin = require('../models/modelAdmin');
const auth = require('../middleware/auth');
const Categorie = require('../models/modelCategorie')
class StockeController {
    static async create(req, res){
        let format = 100;

        try {
            Admin.findOne({_id:req.auth.userId})
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Cet compte est introuvable , Veuillez vous connecter à nouveau"})
                    return
                }
                else{
                    let stok = new Stocke ({
                        libelle:req.body.libelle,
                        reference:`stok${format++}`,
                        montant: req.body.montant,
                        satut:1,
                        etat: true,
                        admins:data._id
                    })
                    stok.save()
                    .then(()=> res.status(200).json({msg: "Stocke ajouté !!"}))
                    .catch((error)=> res.status(401).json({error: error.message}))
                }

            })
            .catch((error)=> res.status(500).json({error: error.message}))
           
        } catch (error) {
            console.log(error.massege, 'erer');
            res.status(500).json({message: error.massege})
        }
    }
}

module.exports = StockeController;