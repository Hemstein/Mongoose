const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
name:{type:String,required:true},
age:{type:Number},
favoriteFood:[String]
})
const user= mongoose.model("user",userSchema)//sandou9

module.exports=user