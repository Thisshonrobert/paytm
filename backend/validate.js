const zod = require("zod")

const obj = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(6)
})

const updateobj = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastnamename:zod.string().optional()
})


const validateUser = (req,res,next) => {

        const {success} = obj.parse(req.body);
        if(!success){
           return  res.status(422).json({
                msg:"Email already taken / Incorrect inputs"
            })
        }
        next();
}

const updateUser = (req,res,next) =>{
    const {success} = updateobj.safeParse(req.body);
    if(!success){
        return res.status(422).json({
            msg:"Error while updating information"
        })
    }
    next();
}


module.exports={
    validateUser,
    updateUser
};