const express = require('express');
const { validateUser } = require("../validate");
const {updateUser} = require("../validate")
const {User}= require("../db");
const {Account} = require("../db");
const userRouter =  express.Router();
const jwt = require('jsonwebtoken');
const PASSWORD = "kitty";
const { authMiddleware } = require('../middleware');



userRouter.post('/signup',validateUser,async(req,res)=>{
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

        const existingUser =  await User.findOne({
            username:username
        })
        
        if(existingUser){
            return res.status(411).json({
                msg:"username already taken / Incorrect inputs"
            })
        }
            const user =await User.create({
                username,
                firstName,
                lastName,
                password,
            })
            const userId = user._id;
            await Account.create({
                userId,
                balance:  Math.floor(Math.random() * (1000 - 1 + 1) + 1)
            })
            if(user){
                const token = jwt.sign({userId},PASSWORD)
                res.status(200).json({
                    msg:"user Created successfully",
                    token:token
                })
            }
});

userRouter.post('/signin',validateUser, async(req, res) => {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    try {
       const user =  await User.findOne({
        username,
        firstName,
        lastName,
        password
        })
        const userId = user._id;
        if(user){
            const token = jwt.sign({userId},PASSWORD)
                res.status(200).json({
                    id:userId,
                    token:token
                })
        }
        else{
            return res.json({
                msg:"user does not exist"
            })
        }
    } catch (error) {
        res.json({
            msg:"Error while logging in"
        })
    }

});

userRouter.put('/',authMiddleware,updateUser,async(req,res)=>{
    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;
