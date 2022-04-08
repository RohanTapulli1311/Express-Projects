const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express();
app.set("view-engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = {
    title: String,
    content:String
}

const Article = mongoose.model("Article",articleSchema)

app.route("/articles")
.get(function(req,res){
    Article.find(function(err,foundArticles){
        if(err){
           // console.log(err)
           res.send(err)
        }
        else{
            //console.log(foundArticles)
            res.send(foundArticles)
        }
    })
})
.post(function (req,res) {
    console.log(req.body.title)
    console.log(req.body.content)

    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    })
     newArticle.save(function(err){
        if(err){
            res.send(err)
        }
        else{
            res.send("successfully added a new article")
        }
     })
    })
.delete(function (req,res) {
    Article.deleteMany(function (err) {
        if(err){
            res.send(err)

        }
        else{
            res.send("Successfully deleted all entries")
        }
      })
});

// route for specific article
app.route("/articles/:articleTitle")
.get(function(req,res){
    title = req.params.articleTitle
    Article.findOne({title:title},function(err,foundArticle){
        if(err){
            res.send("No articles matching the title was found")
        }
        else{
            res.send(foundArticle)
        }
    })
});





app.listen(3000, function () { 
    console.log("server started on port 3000")
 })
 
 //test data
//  {
//     "_id": "6246fb28a875950403c85ffa",
//     "title": "REST",
//     "content": "REST stands for REpresentational State Transfer. It is an architectural style for designing API's"
// },
// {
//     "_id": "6246fbc1a875950403c85ffb",
//     "title": "Bootstrap",
//     "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
// },
// {
//     "_id": "6246fbd3a875950403c85ffc",
//     "title": "DOM",
//     "content": "The Document Object Model is like an API for interacting with our HTML"
// },
// {
//     "_id": "624c7ddca25909f012e3f3d4",
//     "title": "Zlatan Ibrahimovic",
//     "content": "Lions dont compare them to humans",
//     "__v": 0
// },
// {
//     "_id": "624c7f64be423d0941a9047a",
//     "title": "Jack Bauer",
//     "content": "Jack went into a slide, slide slid down",
//     "__v": 0
// }