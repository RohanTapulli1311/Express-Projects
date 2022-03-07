//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const { application } = require("express");
const { cookie } = require("express/lib/response");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemSchema = new mongoose.Schema({
  name: String
})

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
  name: "Welcome to todolist"
})
const item2 = new Item({
  name: "buy food"
})
const item3 = new Item({
  name: "cook food"
})
const item4 = new Item({
  name: "remove food"
})

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
})
const List = mongoose.model("list",listSchema)



app.get("/", function(req, res) {
  
  Item.find({}, function(err, findItems){
    if(err){
      console.log(err)
    }
    else{
      if(findItems.length === 0){
        Item.insertMany([item1,item2,item3,item4], function (err) { 
          if(err){
            console.log(err)
          }
          else{
            console.log("successfully added default items to database")
          }
         } )
         res.redirect("/")
      }
      else{
        res.render("list", {listTitle: "Today", newListItems: findItems});
      }
      //console.log(results)
      
    }
  })


 

});

app.get("/:customListName", function(req,res){
  console.log(req.params.customListName)
  const customListName = req.params.customListName
  List.findOne({name:customListName}, function (err, foundlist) {
    if(!err){
      if(!foundlist){
        console.log("doesnt exist!")
        //create a new list here!
        const list = new List({
          name: customListName,
          items : [item1,item2,item3]
      
        })
        list.save()
        res.redirect("/"+customListName)
      }
      else{
        console.log("already exists!")
        //show the existing list
        res.render("list", {listTitle: foundlist.name, newListItems: foundlist.items} )
      }
    }

    })
 
})



app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list.split(" ").join("");
console.log(req.body)
    const newItem = new Item({
      name: itemName
    })
    if(listName === "Today"){
      newItem.save()
    res.redirect("/");
    }
    else{
      console.log(listName)
      List.findOne({name: listName}, function (err, foundList) { 
        if(!err){
        console.log(foundList)
        foundList.items.push(newItem)
        foundList.save()
        res.redirect("/"+listName)
        }
        else{
          console.log(err)
        }
   
       })
    }
    
  });
app.post("/delete", function (req,res) {
  const checkedItem =req.body.checkbox.split(" ").join("");   

  Item.findByIdAndRemove(checkedItem, function (err) { 
    if(!err){
      console.log("Successfully deleted!")
      res.redirect("/")
    }
    else{
      console.log(err)
    }
   })
res
  })

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
