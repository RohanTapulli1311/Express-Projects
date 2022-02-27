const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use("view engine", "ejs")
app.get("/", function(req,res){
   const today = new Date()
   if(today.getDay() === 6|| today.getDay() === 7){
       res.write("WOHOO! weekend time!")
   }
   else{
       res.write("BOHOO! WORK TIME!")
   }
   res.send()
})

app.listen("3000", function(){
    console.log("listening on port 3000")
})