const mongoose =require('mongoose')

const dataSch =new mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String}
})

const mode =mongoose.model("JustmyRoots",dataSch)

module.exports=mode