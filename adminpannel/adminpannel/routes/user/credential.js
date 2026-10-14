let express= require("express")
const bcrypt = require('bcrypt');
const {User} = require("../../models/use.model");
const generatedtoken = require("../../token/generateToken");
let nodemailer= require("nodemailer")
var jwt = require('jsonwebtoken');
let userrouter= express.Router()
let  saltRounds = 5

userrouter.post("/register", async(req,res)=>{
let {password}=req.body
let myPlaintextPassword = password
let hashed = await bcrypt.hash(myPlaintextPassword, saltRounds)
let newsuser= new User({...req.body, password:hashed})
await newsuser.save()
res.json({data:{...req.body, password:hashed}})
})

// userrouter.post("/login", async(req,res)=>{
// try{
//     let {email, password}= req.body
//     console.log(email,password)
// if(!email || !password){
//     return res.json({"message":"provide full credential"})
// }
// let exist_user= await User.findOne({email})

// if(!exist_user){
//     return res.json({message:"user not found with this email"})
// }
// let myPlaintextPassword=password
// let hash= exist_user.password

// let check = await bcrypt.compare(myPlaintextPassword, hash)
// if(!check){
// return res.json({message:"password error", success:false})
// }

// let accesstoken = generatedtoken({name:exist_user.name,email:exist_user.email,role:exist_user.role,id:exist_user._id},"accesstoken")

// let refreshtoken = generatedtoken({name:exist_user.name,email:exist_user.email,role:exist_user.role,id:exist_user._id},"refreshtoken")

// return res.json({"message":"login successfully",accesstoken,refreshtoken})
// }catch(e){
// res.json({message:e.message, success:false})
// }
// })

userrouter.post("/login", async(req,res)=>{
try{
    let {email, password}= req.body
    console.log(email,password)
if(!email || !password){
    return res.json({"message":"provide full credential"})
}
let exist_user= await User.findOne({email})

if(!exist_user){
    return res.json({message:"user not found with this email"})
}
let myPlaintextPassword=password
let hash= exist_user.password

let check = await bcrypt.compare(myPlaintextPassword, hash)
if(!check){
return res.json({message:"password error", success:false})
}

let accesstoken = generatedtoken({name:exist_user.name,email:exist_user.email,role:exist_user.role,id:exist_user._id},"accesstoken")

let refreshtoken = generatedtoken({name:exist_user.name,email:exist_user.email,role:exist_user.role,id:exist_user._id},"refreshtoken")
res.cookie("accessToken", accesstoken, {
  httpOnly: true,          
  secure: true,            
  sameSite: "none",       
  maxAge: 5*60 * 60 * 1000   
});


res.cookie("refreshToken", refreshtoken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000 
});

return res.json({"message":"login successfully", success:true})
}catch(e){
res.json({message:e.message, success:false})
}
})



let transported = nodemailer.createTransport({
service:"gmail",
auth:{
  user:process.env.USER,
  pass:process.env.PASSWORD
}
})




userrouter.post("/forget_password", async(req,res)=>{
try{

  let {email}=req.body
console.log(email)
let exist_user= await User.findOne({email})
if(!exist_user) return   res.json({"message":"user not exist"})

let  token =await generatedtoken({name:exist_user.name,email:exist_user.email,role:exist_user.role,id:exist_user._id},"accesstoken") 
console.log(token, "token in forgetpassword")
let Generated_link= `http://localhost:5174/reset_password?token=${token}`

await transported.sendMail({
   from:`Vikram yadav <${process.env.USER}>`,
   to:email,
   subject:"testing demo",
   html:`password forget link : ${Generated_link}`
})


  res.json({"message":"email send successfully"})
}
catch(e){
  res.json({"message":e.message})

}

})

userrouter.post("/reset_password", async(req,res)=>{
try{

  let {password, confirm_password,token}=req.body

let decoded = jwt.verify(token, process.env.JWT);

if(password !== confirm_password) return res.json({message:"both password must be same"})

let myPlaintextPassword = password
let hashed = await bcrypt.hash(myPlaintextPassword, saltRounds)

let newsuser =  await User.findOne({email:decoded.email})

newsuser.password=hashed

await newsuser.save()

  res.json({"message":"password updated successfully"})
}
catch(e){
  res.json({"message":e.message, ouput:"link expired"})

}

})





module.exports =userrouter