const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const accountRouter =  express.Router();

accountRouter.get('/balance',authMiddleware,async(req,res)=>{
    const account = await Account.findOne({userId:req.userId});
    res.json({
        balance:account.balance
    })
})

accountRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    const account = await Account.findOne({ userId: req.userId }).session(session);
    const {amount,to} = req.body;
    session.startTransaction();
    if(!account || account.balance < amount){
       await session.abortTransaction()
        return res.status(400).json({
            message:"insufficient balance"
        })
    }
    const receiver = await Account.findOne({userId:to}).session(session);
    if(!receiver){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid user"
        })
    }
    await Account.updateOne({ userId: req.userId },{ $inc: { balance: -amount } }).session(session);    
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

})
module.exports=accountRouter;