const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    // res.send("<h1>Hello world</h1>")
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    console.log(req.body)
    const num1 = Number(req.body.num1)
    const num2 = Number(req.body.num2)
    const sum = num1+num2
    res.send("The sum of two numbers is = "+sum)
})

app.listen(4001,function(){
    console.log("server is listening to port 4001")
})