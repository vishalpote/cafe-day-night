const express=require('express')
const app=express()
const bodyparse=require('body-parser')
const path=require('path')

app.use(bodyparse.urlencoded({extended:true}))
// app.use(bodyparse.json())


const mongoose=require('mongoose')
const { error } = require('console')
mongoose.connect("mongodb://127.0.0.1:27017/Coffiies")
.then(()=>console.log("Database Are Connected... "))
.catch((err)=>console.log(err))


const userschema=new mongoose.Schema({
    name:String,
    surname:String,
    email:String,
    password:String
})

const users1=new mongoose.model("user",userschema);


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})


app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,'About.html'))
})

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})

app.post('/contact',async (req,res)=>{
const {name,surname,email,password}=req.body

const newuser=new users1({
    name:name,
    surname:surname,
    email:email,
    password:password
});
try{
    await newuser.save();
    res.sendFile(path.join(__dirname,'index.html'))
}
catch(error){
    console.error(err)
    alert("error to contact me..");
}

});

app.listen(3000,()=>console.log("port on 3000"))