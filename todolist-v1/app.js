const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.get("/", function(req,res){
   const today = new Date()
   dayList = ["monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
   dayType = ""
   day = ""
   if(today.getDay() === 6|| today.getDay() === 7){
       dayType = "weekend"
       day = dayList[today.getDay()]
   }
   else{
        dayType = "weekday"
       day = dayList[today.getDay()]
  
   }
   res.render("lists",{kindOfDay: day, type: dayType })
 
})

app.listen("3000", function(){
    console.log("listening on port 3000")
})