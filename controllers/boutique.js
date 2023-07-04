const registerBoutik = require("../models/registerBoutik");

class Boutique {
    static async create(req, res){
        try {
            const urllogo= req.file.filename
            const {nomBoutique,logo, ...body} = req.body
            registerBoutik.findOne({nomBoutique: nomBoutique})
            .then((data)=>{
                if(data){
                    res.status(404).json({msg:"Boutique existe déjà"})
                    return
                }
                const boutique = new registerBoutik({
                    nomBoutique,
                    ...body,
                    logo: `${req.protocol}://${req.get('host')}/images/${urllogo}`
                })
                boutique.save()
                .then(()=>{
                    res.status(201).json({msg: "Boutique enregistrée !!!"})
                })
                .catch((error)=> res.status(400).json({error: error.message}))
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.static(500).json({error: error.message})
        }
    }

    static async readById(req, res){
        const {id} = req.params
        try {
            registerBoutik.findById(id)
            .then((data)=>{
                if(!data){
                    res.status(404).json({msg: "Boutique introuvable !!!"})
                }
                res.statuc(200).json({data})
            })
            .catch((error)=> res.status(400).json({error: error.message}))
            
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}
module.exports = Boutique