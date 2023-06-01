const Admin = require('../models/modelAdmin');
const Role = require('../models/modelRole')
class RoleController {
    static async create(req, res){
        let reference = 100;
        try {
            Role.find({})
            .then(allRole=>{
                if(allRole.length > 0){
                    reference = Number(allRole[allRole.length-1].reference.split('OLE')[1])+1;
                }
            })
            Admin.findOne({_id: req.auth.userId})
            .then((data)=>{
                if(data.length == 0){
                    res.status(404).json({msg: "Cet compte est introuvable , Veuillez vous connecter à nouveau"})
                    return
                }else{
                    let role = new Role({
                        libelle:req.body.libelle,
                        reference:`ROLE${reference}`,
                        satut:1,
                        admins:data._id
                    })
                    role.save()
                    .then(()=> res.status(200).json({msg: "Rôle ajouté avec succès !!"}))
                    .catch((error)=> res.status(401).json({error: error.message}))
                }
            })
            .catch((error)=> res.status(500).json({error: error.message}));
        }catch (error) {
            console.log(error);
            res.status(500).json({message: error.massege})
        }
    }

    static async read(req, res){
        try{
            Admin.findOne({_id:req.auth.userId, statut:1})
            .then(admin=>{
                if(admin){
                    Role.find({statut:1})
                    .then(allRole=> {
                        const msg = `Il y'a ${allRole.length} élémnents disponible(s).`;
                        res.status(200).json({msg: msg, data: allRole});
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
                    Role.findById(req.params.id)
                    .then(role=>{
                        if(role.length===0 || role.statut === 0){
                            const msg = `Le role dont l'identifiant est ${req.params.id} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: Role});
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
                    Role.find({reference: req.params.reference})
                    .then(role=>{
                        if(role.length===0 || role.statut === 0){
                            const msg = `Le role dont l'identifiant est ${req.params.reference} n'existe pas`;
                            res.status(200).json({msg: msg});
                        }else{
                            const msg = `Un élément est trouvé.`;
                            res.status(200).json({msg: msg,data: role});
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
                Role.findOne({_d:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        let updat = {...req.body};
                        Role.updateOne({id: req.body.id},{...updat,_id:req.body._id})
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
                    console.log(error);
                    res.status(404).json({error: error.message});
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
                Role.findOne({_d:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Role.updateOne({id: req.body.id},{statut:0})
                        .then(()=>{
                            res.status(201).json({msg: "Suppression effectué avec succès !!"});
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
                    console.log(error);
                    res.status(404).json({error: error.message});
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
    }
}
module.exports = RoleController;