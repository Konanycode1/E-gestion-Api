const Admin = require('../models/modelAdmin');
const Employe = require('../models/modelEmploye')
class EmployeController {
    static async create(req, res){
        try {
            const employe = await Employe.create(req.body);
            res.status(200).json({employe});
        } catch (error) {
            console.log(error.massege);
            res.status(500).json({message: error.massege})
        }
    }
}

module.exports = EmployeController;