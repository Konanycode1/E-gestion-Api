const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, 'RANDOM_TOKEN_KEY');
        const userId =  decodeToken.userId
        const status = decodeToken.status
        req.auth ={
            userId: userId,
            status: status
        }
        next();
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error: error.message})
    }
}