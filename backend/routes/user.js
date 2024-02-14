const express = require('express');
const { validateUser } = require("../validate");
const {updateUser} = require("../validate")
const {User}= require("../db");
const {Account} = require("../db");
const userRouter =  express.Router();
const jwt = require('jsonwebtoken');
const PASSWORD = require('../config');
const { authMiddleware } = require('../middleware');



userRouter.post('/signup',validateUser,async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try{
        const existingUser =  await User.find({
            username:username
        })
        
        if(existingUser._id){
            return res.status(411).json({
                msg:"username already taken / Incorrect inputs"
            })
        }
            const user =await User.create({
                username,
                firstname,
                lastname,
                password,
            })
            const userId = user._id;
            await Account.create({
                userId,
                balance:  Math.floor(Math.random() * (1000 - 1 + 1) + 1)
            })
            if(user){
                const token = jwt.sign(userId,PASSWORD)
                res.status(200).json({
                    msg:"user Created successfully",
                    token:token
                })
            }
        
        
    }catch(e){
        res.status(411).json({
            msg:"username already taken / Incorrect inputs"
        })
    }
});

userRouter.post('/signin',validateUser, async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    try {
       const user =  await User.findOne({
        username,
        firstname,
        lastname,
        password
        })
        const userId = user._id;
        if(user){
            const token = jwt.sign(userId,PASSWORD)
                res.status(200).json({
                    msg:userId,
                    token:token
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

userRouter.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";
    try {
        const filterUser = await find({
            $or:[{
                firstname:{
                    $regex:filter
                },
                lastname:{
                    $regex:filter
                }
                }]
        })
        res.status(200).json({
            user: filterUser.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })

    } catch (error) {
        res.status(404).json({
            message:"user not found"
        })
    }
})

module.exports = userRouter;
