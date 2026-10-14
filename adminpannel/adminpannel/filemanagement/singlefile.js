let express= require("express")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


let uploadrouter= express.Router()


uploadrouter.post("/single_file",upload.single('avatar'), (req,res)=>{

console.log(req.file)


res.json({"message":"return from single file"})
})


uploadrouter.post("/multiple_file",upload.array('avatar',10), (req,res)=>{

console.log(req.files)


res.json({"message":"return from multiple files"})
})








module.exports= uploadrouter