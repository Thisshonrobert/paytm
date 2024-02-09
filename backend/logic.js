const express = require('express');
const { validateUser } = require("./validate");
const User = require("./db");
const router = express.Router();
const jwt = require('jsonwebtoken');
const PASSWORD = require('..');

router.post('/signup',validateUser,async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        await User.create({
            username,
            password
        })
    }catch(e){
        res.json({
            msg:"failed to create user"
        })
    }
});

router.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
       const user =  await User.findOne({
            username,
            password
        })

        if(user){
            const token = jwt.sign({username},PASSWORD)
            res.json(token)
        }
        else{
            res.status(411).json({
                msg:"incorrect username and password"
            })
        }
    } catch (error) {
        res.json({
            msg:"Invalid user"
        })
    }

});

module.exports = router;