let express= require("express")
const Auth = require("../middleware/Auth")
const { Product } = require("../models/use.model")

let Productrouter= express.Router()

let roles=["admin","manager", "zonalHead","ceo"]

Productrouter.post("/create_product", Auth(...roles), async (req,res)=>{

try{
    let {name, price}= req.body

if(!name || !price){
return res.json({"message":"please provide full data for creating product"})

}

let newproduct= new Product({...req.body})
 await newproduct.save()
 res.json({"message":"product created succesfully", success:true})
}catch(e){
return res.json({message:e.message,success:false})
}


})


Productrouter.post("/analysed_data", Auth(...roles.slice(2)), (req,res)=>{

console.log(req.body)
console.log(req.userId)
console.log(req.email)

res.json({"message":"product created succesfully"})
})

module.exports= Productrouter