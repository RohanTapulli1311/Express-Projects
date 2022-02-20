const express = require("express")
const bodyParser = require("body-parser")
// const request = require("request")
const app = express()

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.listen(3002, function(){
    console.log("server listening on port 3002")
})