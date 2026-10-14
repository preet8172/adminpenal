let mongoose = require("mongoose")


let userschema= new mongoose.Schema({
name:{type:String, required:true},
email:{type:String, required:true},
password:{type:String, required:true},
role:{type:String, enum:["user","admin"], default:"user"}
})

let Productschema=new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number},
},
{timestamps:true}
)


let Product= mongoose.model("PRODUCT",Productschema)




let User= mongoose.model("USER", userschema)



module.exports = {User, Product}