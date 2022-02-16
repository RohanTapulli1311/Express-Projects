const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    // res.send("<h1>Hello world</h1>")
    res.sendFile(__dirname + "/index.html")
})

app.get("/bmicalculator",function (req,res) {
    res.sendFile(__dirname + "/bmiCalculator.html")
  })

app.post("/bmicalculator", function (req,res) {
    console.log(req.body)
    const height  = Number(req.body.height)
    const weight = Number(req.body.weight)
    const bmi = weight/Math.pow(height,2)
    res.send("The bmi for the values entered is = "+bmi)
  })

app.post("/", function(req,res){
    console.log(req.body)
    const num1 = Number(req.body.num1)
    const num2 = Number(req.body.num2)
    const sum = num1+num2
    res.send("The sum of two numbers is = "+sum)
})

app.get("/family", function(req,res){
  console.log(req.body)
  
})


app.listen(4001,function(){
    console.log("server is listening to port 4001")
})