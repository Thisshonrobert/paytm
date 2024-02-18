const zod = require("zod")

const obj = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const updateobj = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})


const validateUser = (req,res,next) => {

        const {success} = obj.safeParse(req.body);
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