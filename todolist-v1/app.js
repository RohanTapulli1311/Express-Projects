const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/day.js")
const app = express()

console.log(date)
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
const items = ["Buy Food","Cook Food","Eat Food"]
const workItems = []


app.get("/", function(req,res){
    // const day = date.getDay()
    const day = date.getDate()
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