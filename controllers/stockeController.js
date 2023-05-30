const Stocke = require('../models/modelStocke')
class StockeController {
    static async create(req, res){
        try {
            const stocke = await Stocke.create(req.body);
            res.status(200).json({stocke});
        } catch (error) {
            console.log(error.massege);
            res.status(500).json({message: error.massege})
        }
    }
}

module.exports = StockeController;