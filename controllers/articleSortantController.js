const ArticleSortant = require('../models/modelArticleSortant');
class ArticleSortantController{
    static async create(req, res){
        try {
            const articleSortant = await ArticleSortant.create(req.body)
            res.status(200).json({articleSortant});
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ArticleSortantController