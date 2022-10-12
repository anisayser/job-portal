const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    try {

        const token = req.headers?.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(401).json({
                status: "Failed",
                error: "Your'e not loged in."
            })
        };


        const decode = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

        req.user = decode;  

        next();

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Invalid Token",
            error: error.message
        })
    }
}