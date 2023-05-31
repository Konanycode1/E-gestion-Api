const Stocke = require('../models/modelStocke');
const Admin = require('../models/modelAdmin');
const auth = require('../middleware/auth');
<<<<<<< HEAD
const Categorie = require('../models/modelCategorie')
class StockeController {
    static async create(req, res){
        let format = 100;

        try {
=======
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
>>>>>>> gestAPI
            Admin.findOne({_id:req.auth.userId})
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Cet compte est introuvable , Veuillez vous connecter à nouveau"})
                    return
                }
                else{
                    let stok = new Stocke ({
                        libelle:req.body.libelle,
<<<<<<< HEAD
                        reference:`stok${format++}`,
=======
                        reference:`STOCK${reference}`,
>>>>>>> gestAPI
                        montant: req.body.montant,
                        satut:1,
                        etat: true,
                        admins:data._id
                    })
                    stok.save()
                    .then(()=> res.status(200).json({msg: "Stocke ajouté !!"}))
<<<<<<< HEAD
                    .catch((error)=> res.status(401).json({error: error.message}))
                }

            })
            .catch((error)=> res.status(500).json({error: error.message}))
           
        } catch (error) {
=======
                    .catch((error)=> res.status(401).json({error: error.message}));
                }
            })
            .catch((error)=> res.status(500).json({error: error.message}));
           
        } catch (error){
>>>>>>> gestAPI
            console.log(error.massege, 'erer');
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
                        console.log(allStocke);
                        const msg = `Il y'a ${allStocke.length} élémnents disponible(s).`;
                        res.status(200).json({msg: msg, data: allStocke});
                    })
                    .catch((error)=>{
                        const msg = "Aucun élément trouvé";
                        res.status(400).json({msg: msg, data: error.message});
                    })
                }
            })
            
        }catch(error){
            res.status(500).json({data: error.message});
        }
    }
}
module.exports = StockeController;