const {PASSWORD} = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    const header = req.header.authorization;
    if(!header || header.startsWith("Bearer")){
        return res.status(403).json({})
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, PASSWORD);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            
        }
        
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}
    
