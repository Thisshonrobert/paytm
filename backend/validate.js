const zod = require("zod")

const  u = zod.string();
const  p = zod.password();


const validateUser = (req,res,next) => {
    try{
        u.parse(req.body.username);
        p.parse(req.body.password);
        next();
    }
    catch(e){
        res.status(401).json({
            msg:e
        })
    }
}
module.exports={validateUser};