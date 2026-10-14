let jwt = require('jsonwebtoken');

function generatedtoken(obj, type){
let Token;
if(type=="accesstoken"){
    Token = jwt.sign({...obj}, process.env.JWT, {expiresIn:60*60});
}
if(type=="refreshtoken"){
    Token = jwt.sign({...obj}, process.env.JWT, {expiresIn:"7d"});
}

return Token
}


module.exports=generatedtoken