const zod = require("zod")

const obj = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(6)
})


const validateUser = (req,res,next) => {
    try{
        obj.safeParse(req.body);
        next();
    }
    catch(e){
        res.status(401).json({
            msg:e.message
        })
    }
}
module.exports={validateUser};