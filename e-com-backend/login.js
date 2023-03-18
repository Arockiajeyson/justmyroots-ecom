const express =require('express')
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const app =express()
const Shema =require('./Schema')
app.post('/',async (req,res)=>{
    try {
        console.log(req.body)
        const find =await Shema.findOne({Email:req.body.Email})
        if(find) {
            const data =await bcrypt.compare(req.body.Password, find.Password);
            // console.log(data)
            if(data){
                const token =await jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (160 * 160),
                    data: find._id
                  }, 'new');
                  
                  return res.json(['Logged-in',token,find.Types])
            }else{
                return res.json('invalid password')
            }
        }
        else{
            return res.json('Register first')
        }
    } catch (error) {
       return res.json(error)
    }
})

module.exports=app