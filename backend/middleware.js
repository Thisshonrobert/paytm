const {PASSWORD} = require("./config");
const jwt = require("jsonwebtoken");



export function authMiddleware(req,res){
    const header = req.header.authorization;
    if(!header || header.startsWith("Bearer")){
        return res.status(403).json({})
    }
    const token = header.split(" ")[1];
    const decode = jwt.decode(token,PASSWORD)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}
    
