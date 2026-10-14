let mongoose= require("mongoose")


async function connecteddb() {
try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("server connected to mongodb")
}catch(e){
console.log(e.message)
}

}

module.exports=connecteddb