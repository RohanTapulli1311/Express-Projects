const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
const items = ["Buy Food","Cook Food","Eat Food"]
const workItems = []
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


    res.render("lists",{listTitle: day, newListItem: items})
 
})

app.post("/", function(req,res){
    console.log(req.body)
 const newItem = req.body.newItem
 if(req.body.list === "work"){
workItems.push(newItem)
res.redirect("/work")
 }
 else{
    console.log(newItem)
    items.push(newItem)
   
    res.redirect("/")
 }

})

app.get("/work", function (req,res) {
    res.render("lists",{listTitle:"work list",newListItem:workItems})
  })

app.post("/work", function (req,res) {
    const item = req.body.newItem
    workItems.push(items)
    res.redirect("/work")
  })

  app.get("/about", function(req,res){
      res.render("about")
  })

app.listen("3000", function(){
    console.log("listening on port 3000")
})