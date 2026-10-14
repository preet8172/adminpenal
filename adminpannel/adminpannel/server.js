let dotenv= require("dotenv")
dotenv.config()
let express= require("express")
const connecteddb = require("./dbconfig")
const userrouter = require("./routes/user/credential")
const Productrouter = require("./routes/Product")
const uploadrouter = require("./filemanagement/singlefile")
var cookieParser = require('cookie-parser')
var cors = require('cors')
let app= express()
app.use(cors())
app.use(express.json())

app.use(cookieParser())

app.get("/test", (req,res)=>{
    res.json({"message":"test route "})
})


let PORT= process.env.PORT || 5000

app.use("/users",userrouter)

app.use("/products", Productrouter)
app.use("/file_upload", uploadrouter)

app.listen(PORT, ()=>{
    connecteddb()
    console.log("server running at port 5000")
})




