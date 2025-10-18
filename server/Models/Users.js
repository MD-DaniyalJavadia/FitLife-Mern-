import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    UserEmail:{
         type:String,
        required:true,
        unique:true
    },
    UserPassword:{
         type:String,
        required:true,

    },
    CreatedAt: {
        type:Date,
        default: Date.now
    }
})
// Create the User model from the schema
const User = mongoose.model('User', userSchema);
export default User;