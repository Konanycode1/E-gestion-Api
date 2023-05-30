const Article = require('../models/modelArticle');
class articleController {
    static async create(req, res){
        try {
            const article = await Article.create(req.body);
            res.status(200).json({article});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = articleController;