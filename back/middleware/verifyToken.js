const Jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_SECRET || "eco";

module.exports = function (req, res, next) {
    let token = req.headers['authorization']
        if (token) {
            token = token.split(' ')[1]
            console.warn("middleware called", token)
            Jwt.verify(token, jwtkey, (err, valid) => {
                if (err) {
                    res.status(401).send({ result: "Please provide valid token " })
                } else {
                    next()
                }
            })
    
        } else {
            res.status(403).send({ result: "Please send token with headers" })
        }
};
