const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
        const employeId =  decodeToken.employeId;
        const status = decodeToken.status;
        req.empAuth ={
            employeId: employeId,
            status: status
        }
        next();
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}