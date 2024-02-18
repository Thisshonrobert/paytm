const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://thisshonrobert:9g4V501my5XYW0G1@cluster0.ewmaqqe.mongodb.net/paytm")

const userDataSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    } ,
    lastName: {
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
})

const balanceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        minlength:12,
        required:true,
    },
	balance: Number
})

const User = mongoose.model('User',userDataSchema);
const Account = mongoose.model('Accounts',balanceSchema);
module.exports={
    User,
    Account
};