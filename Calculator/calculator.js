const express = require("express")

const app = express()

app.get("/", function(req,res){
    res.send("<h1>Hello world</h1>")
})

app.listen(4001,function(){
    console.log("server is listening to port 4001")
})