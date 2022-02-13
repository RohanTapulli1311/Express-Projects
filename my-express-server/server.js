const express = require("express")

const app = express()
app.get("/", function(request,response){
   response.send("<h1>Hello World!</h1>")
})

app.get("/contact",function (req,res) {
    res.send("<h1>Contact me at rohan.tapyulli@gmail.com</h1>")
  })

app.get("/about",function(req,res){
    res.send("<p>Hello! Rohan here. I am an undergraduate Computer Engineering student at FRCRCE, Bandra")
})
app.get("/hobbies",function(req,res){
    res.send("<p>EAT, HUSTLE, SLEEP, REPEAT</p>")
})

app.listen(4000, function(){
    console.log("Server running on port 4000")
})