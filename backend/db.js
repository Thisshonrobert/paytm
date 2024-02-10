const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://thisshonrobert:9g4V501my5XYW0G1@cluster0.ewmaqqe.mongodb.net/")

const userData = new Schema({
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

const User = data.model('patym',userData);
module.exports=User;