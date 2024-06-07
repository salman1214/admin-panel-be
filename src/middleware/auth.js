const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || token == "undefined") return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
        if (!verified) {
            res.status(403).send("Unauthorized user");
        }
        req.user = verified;
        next();
    } catch (err) {
        console.log(err)
        res.status(400).send('Invalid Token');
    }
};

const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
        req.jwt = decoded;
        console.log("JWT ---->>> ", req.jwt)
        if (!req.jwt || req.jwt.roleId !== 1) {
            res.status(403).send('Only admin can access this route');
            return 0;
        }
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(409).json('Token Expired, Please Login again');
        }
        console.log(error);
        res.status(500).json('Something went wrong');
    }
};

module.exports = { isLoggedIn , isAdmin };