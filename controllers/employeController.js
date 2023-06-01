const Admin = require('../models/modelAdmin');
const Employe = require('../models/modelEmploye')
const bcrypt = require('bcrypt');
class EmployeController {
   static async create(req, res){
        try {
            let reference = 100;
            Employe.find({})
            .then(allCategorie=>{
                if(allCategorie.length > 0){
                    reference = Number(allCategorie[allCategorie.length-1].reference.split('MPL')[1])+1;
                }
            })
            Admin.findOne({_id:req.auth.userId})
            .then((data) =>{
                if(data){
                    Employe.find({email: req.body.email})
                    .then(employe=>{
                        if(employe.length===0){
                            const chiffre = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
                            if(req.body.telephone.toString().length===10 && req.body.telephone.toString().split('').every(item=>chiffre.includes(Number(item)))){
                                bcrypt.hash("123456", 10)
                                .then((hash)=>{
                                    let newEmploye = new Employe({
                                        ... req.body,
                                        reference: `EMPL${reference}`,
                                        admins: req.auth.userId,
                                        roles: req.body.roles,
                                        password: hash,
                                        statut: 1,
                                    })
                                    newEmploye.save()
                                    .then(()=> res.status(200).json({msg:"Employé ajouté avec succès"}))
                                    .catch((error)=> res.status(400).json({error:error.message}))
                                })
                                .catch((error)=>res.status(401).json({error:error.message}))
                            }else{
                                res.status(400).json({msg: "L'adresse téléphonique réquière exactement 10 chiffres."})
                            }
                        }else{
                            res.status(401).json({msg: "Ce compte est déjà utilisé."})
                        }
                    })
                    
                }else{
                    res.status(401).json({msg:"Cet compte existe déjà, veuillez vous connectez"})
                }
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async read(req, res){
        try{
            Admin.findOne({_id:req.auth.userId, statut:1})
            .then(admin=>{
                if(admin){
                    Employe.find({statut:1})
                    .then(allEmploye=> {
                        const msg = `Il y'a ${allEmploye.length} élémnents disponible(s).`;
                        res.status(200).json({msg: msg, data: allEmploye});
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

    static async indexById(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(admin){
                    Employe.findById(req.params.id)
                    .then(employe=>{
                        if(employe.length===0 || employe.statut === 0){
                            const msg = `Le employe dont l'identifiant est ${req.params.id} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: employe});
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

    static async indexByRef(req, res){  // On trouve en fonction de la référence du catégorie
        try{
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(admin){
                    Employe.find({reference: req.params.reference})
                    .then(employe=>{
                        if(employe.length===0 || employe.statut === 0){
                            const msg = `Le employé dont l'identifiant est ${req.params.reference} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: employe});
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


    static async update(req,res){
        try {
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Employe.findOne({_d:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        let updat = {...req.body};
                        Employe.updateOne({id: req.body.id},{...updat,_id:req.body._id})
                        .then((newData)=>{
                            res.status(201).json({msg: "Modification effectué avec succès", newData: newData});
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({error: error.message});
                        })
                    }
                    else{
                        console.log('Compte introuvable');
                        res.status(401).json({msg: "Compte introuvable !!!"});
                    }
                })
                .catch(error=> {
                    console.log(error)
                    res.status(404).json({error: error.message})
                })
            })
            
            
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    }

    static async delete(req,res){
        try {
            Admin.findOne({_id:req.auth.userId})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Employe.findOne({_d:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Employe.updateOne({id: req.body.id},{statut:0})
                        .then(()=>{
                            res.status(201).json({msg: "Suppression effectué avec succès !!"})})
                        .catch((error)=> {
                            console.log(error)
                            res.status(404).json({error: error.message})
                        })
                    }
                    else{
                        console.log('Compte introuvable');
                        res.status(401).json({msg: "Compte introuvable !!!"})
                    }
                })
                .catch(error=> {
                    console.log(error)
                    res.status(404).json({error: error.message})
                })
            })
            
            
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    }
}

module.exports = EmployeController;