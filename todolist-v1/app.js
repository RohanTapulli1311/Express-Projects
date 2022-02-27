const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function(req,res){
   const today = new Date()
//    dayList = ["monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
//    dayType = ""
//    day = ""

const options = {
    weekday : "long",
    day: "numeric",
    month : "long"
}

 const day  = today.toLocaleDateString("en-US",options)

//    if(today.getDay() === 6|| today.getDay() === 7){
//        dayType = "weekend"
//        day = dayList[today.getDay()]
//    }
//    else{
//         dayType = "weekday"
//        day = dayList[today.getDay()]
  
//    }


    res.render("lists",{kindOfDay: day})
 
})

app.post("/", function(req,res){
 const newItem = req.body.newItem
 console.log(newItem)
})

app.listen("3000", function(){
    console.log("listening on port 3000")
})