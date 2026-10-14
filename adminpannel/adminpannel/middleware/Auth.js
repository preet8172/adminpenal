var jwt = require('jsonwebtoken');
const generatedtoken = require('../token/generateToken');

function Auth(...role){
return (req,res,next)=>{


let accesstoken;
let refreshtoken;

// accesstoken = req.headers?.accesstoken?.split(" ")[1]
accesstoken = req.cookies.accessToken
// refreshtoken = req.headers?.refreshtoken?.split(" ")[1]
refreshtoken = req.cookies.refreshToken

let payload=null;

if(accesstoken){
    try{
payload = jwt.verify(accesstoken, process.env.JWT);

if(role.includes(payload.role)){
    req.userId=payload.id
    req.email=payload.email
    next()
}else{
    return res.json({message:"you are not allowed for this role"})
}



}catch(e){

    if(e.message=="jwt expired"){
        console.log("Token has expired", e.message)
    }else{
        return res.json({"message":"wrong token"})
    }

}

if(!payload){

    try{
if(!refreshtoken){
 return res.json({"message":"login again"})
}

payload= jwt.verify(refreshtoken, process.env.JWT);

if(role.includes(payload.role)){
    req.userId=payload.id
    req.email=payload.email

let accesstoken = generatedtoken({name:payload.name,email:payload.email, role:payload.role, id:payload.id}, "accesstoken")   

console.log(payload, "payload in refresh token")

// res.setHeader("accesstoken", accesstoken);

res.cookie("accessToken", accesstoken, {
  httpOnly: true,          
  secure: true,            
  sameSite: "none",       
  maxAge: 5*60 * 60 * 1000   
});

    next()
}else{
    return res.json({message:"you are not allowed for this role"})
}

    }catch(e){

        if(e.message=="jwt expired"){
            return res.json({"message":"please login again"})
        }else{
            return res.json({"message":"wrong token"})
        }


    }

}

}



if(!payload){
    return res.json({"message":"please login again"})
}


}




}

module.exports=Auth