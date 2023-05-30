const Categorie = require('../models/modelCategorie');
class categorieController{
    static async create(req, res){
        try {
            const categorie = await Categorie.create(req.body)
            res.status(200).json({categorie});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = categorieController