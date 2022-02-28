const express = require("express")
const bodyParser = require( "body-parser")

const app = express()
let newFamMember = []
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function (req,res) {
    let myName = "Rohan"
    res.render("list",{myFamilia:newFamMember })
  })

app.post("/",function (req,res) {
  const newMember = req.body.addFam
  console.log(newMember)
  newFamMember.push(newMember)
  res.redirect("/")
  })

app.listen("3000", function(){
    console.log("listening to port 3000")
})