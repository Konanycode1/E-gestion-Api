const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
        const userId =  decodeToken.userId;
        const reference = decodeToken.reference;
        req.auth = {
            userId: userId,
            reference: reference
        }
        next();
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}