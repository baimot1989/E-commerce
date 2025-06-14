
const jwt = require('jsonwebtoken');

// this authentication is for api request  from the users
const requireAuth = (req, res, next) => {
    
    const token = req.cookies.jwt;
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
            if (error) {
                res.json(error.message);
            } else {
                next();
            }
        })
    } else {
        res.json('Request rejected, You are not authorized')
    }
}



module.exports = { requireAuth  };