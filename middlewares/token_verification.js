const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv/config.js')
dotenv.config();

const token_key = process.env.TOKEN_SECRET_KEY;

function check_auth(req, res, next) {
    try {
        let token = req.headers['authorization'];
        if (!token)
            return res.status(403).send({
                auth: "failed",
                message: 'No token provided'
            });

        jwt.verify(token, token_key, function (err, decoded) {
            if (err)
                return res.status(401).send({
                    auth: "failed",
                    message: 'expired token'
                });
            req.user_data = decoded;
            next();
        });
    } catch (err) {
        return res.status(401).json({
            auth: "failed",
            message: 'Auth failed'
        })
    }
}

module.exports = check_auth;