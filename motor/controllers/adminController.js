const Admin = require('../models/modelAdmin')
class AdminController {
    static async create(req, res){
        try {
            const admin = await Admin.create(req.body);
            res.status(200).json({admin});
        } catch (error) {
            console.log(error.massege);
            res.status(500).json({message: error.massege})
        }
    }
}

module.exports = AdminController;