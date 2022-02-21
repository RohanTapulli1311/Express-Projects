const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { urlToHttpOptions } = require("url")
// const request = require("request")
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    // console.log(fname+" "+lname+" "+email)

    const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields : {
                  FNAME: fname,
                  LNAME : lname
              }
          }
      ]
    }
    const jsonData = JSON.stringify(data)

    const url = "https://us14.api.mailchimp.com/3.0/lists/c5f09e78e4"

    const options = {
        method : "POST",
        auth: "rohan1:300f81fd5936233401ec73b925f2cfdc-us14"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
})

app.listen(3002, function(){
    console.log("server listening on port 3002")
})

  //300f81fd5936233401ec73b925f2cfdc-us14

  //Audience id
  //c5f09e78e4