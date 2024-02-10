const express = require('express');
const { validateUser } = require("../validate");
const {User}= require("../db");

const userRouter =  express.Router();
const jwt = require('jsonwebtoken');
const PASSWORD = require('../config');

userRouter.post('/signup',validateUser,async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try{
        const existingUser =  await User.find({
            username,
            firstname,
            lastname,
            password
        })
        
        if(existingUser){
            return res.status(411).json({
                msg:"username already taken / Incorrect inputs"
            })
        }
            const user =await User.create({
                username,
                firstname,
                lastname,
                password
            })
            const userId = user._id;
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

userRouter.post('/signin', async(req, res) => {
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

module.exports = userRouter;
