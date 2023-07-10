const express=require('express')
const mongoose=require('mongoose')
const bodyparse=require('body-parser')
const path=require('path')
const app=express()

app.use(bodyparse.urlencoded({extended:true}))

mongoose.connect("mongodb://127.0.0.1:27017/loginme")
.then(()=>console.log("Database connected"))
.catch((err)=>console.log(err))

const loginschema=new mongoose.Schema({
    username:String,
    password:String
})

const log=new mongoose.model("log",loginschema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})

app.post('/',async(req,res)=>{
    const {username,password}=req.body
    const newuser=new log({
    username:username,
    password:password
    })
    try
    {
        await newuser.save()
        res,send("login success");
    }
    catch(err)
    {
        console.error(err);
        res.send("error occuring")
    }
})


app.listen(port=1000,()=>console.log(`port on ${port}`))

