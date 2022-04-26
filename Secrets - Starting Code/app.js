//jshint esversion:6
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
// const encrypt = require("mongoose-encryption")
// const md5 = require("md5")
const bcrypt = require("bcrypt")
const app = express()

const saltRounds = 10

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/userDB")

const userSchema = new mongoose.Schema({
    email : String,
    password: String
});
// encryption using mongoose-encryption

// userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]})

const User = mongoose.model("User",userSchema)



app.get("/",function (req,res) {
    res.render("home")
  })
app.get("/login",function (req,res){
    res.render("login")
  })
app.get("/register",function (req,res) {
    res.render("register")
  })

app.post("/register", function (req,res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        username = req.body.username
        password = hash
    const newUser = User({
        email: username,
        password:password
    })
    newUser.save(function (err) {
        if(!err){
            res.render("secrets")
        }
        else{
            console.log(err)
        }
      })
    });
    
  })

  app.post("/login", function (req,res) {
    email = req.body.username
    password = req.body.password
    User.findOne({email:email},function (err,foundUser) {
        if(err){
            console.log(err)
        }
        else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                   if(result == true){
                    console.log("successfully logged in")
                    res.render("secrets")
                   }
                   else{
                    console.log("incorrect password")
                }
                    
                });
                
            }
 
        }
      })
    })


app.listen(3000, function () {
    console.log("Server started on port 3000")
  })