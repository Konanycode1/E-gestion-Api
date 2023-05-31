const Stocke = require('../models/modelStocke');
const Admin = require('../models/modelAdmin');
const auth = require('../middleware/auth');
const Categorie = require('../models/modelCategorie');
class CategorieController {
    static async create(req, res){
        let reference = 100;
        try {
            Categorie.find({})
            .then(allCategorie=>{
                if(allCategorie.length > 0){
                    reference = Number(allCategorie[allCategorie.length-1].reference.split('EG')[1])+1;
                }
            })
            console.log('_____________________________________________________', req.auth.userId);
            Admin.findOne({_id:req.auth.userId})
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Cet compte est introuvable , Veuillez vous connecter à nouveau"})
                    return
                }else{
                    
                    let categorie = new Categorie({
                        libelle:req.body.libelle,
                        reference:`CATEG${reference}`,
                        satut:1,
                        etat: true,
                        admins:data._id
                    })
                    categorie.save()
                    .then(()=> res.status(200).json({msg: "Catégorie ajouté !!"}))
                    .catch((error)=> res.status(401).json({error: error.message}))
                }
            }).catch((error)=> res.status(500).json({error: error.message}))
           
        }catch (error) {
            console.log(error.massege, 'erer');
            res.status(500).json({message: error.massege})
        }
    }
}
module.exports = CategorieController;