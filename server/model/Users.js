const mongoose=require('mongoose')

const UsersSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true,
    },
    UserEmail:{
        type:String,
        required:true,
        unique:true,
    },
    UserPassword:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        defult:Date.now
    },
})
const Users =mongoose.model('User',UsersSchema);
module.exports=Users; 