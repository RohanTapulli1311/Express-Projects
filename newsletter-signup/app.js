
const myModule = require('./config');
const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const { urlToHttpOptions } = require("url")
// const request = require("request")
const apikey = myModule.config.api_key_mchp
const aud_id = myModule.config.audience_id
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

    const url = `https://us14.api.mailchimp.com/3.0/lists/${aud_id}`

    const options = {
        method : "POST",
        auth: `rohan1:${apikey}`
    }

    const request = https.request(url, options, function(response){
        console.log(response.statusCode)
        // if(response.statusCode != 200){
        //     res.sendFile(__dirname+"/failure.html")
        // }
        // else{
        //     res.sendFile(__dirname+"/success.html")
        // }
        
        response.on("data", function(data){
            const jsonfile = JSON.parse(data)
            console.log(JSON.parse(data))
            console.log(jsonfile.error_count)
            if(jsonfile.error_count === 1){
                res.sendFile(__dirname+"/failure.html")
            }
            else{
                res.sendFile(__dirname+"/success.html")
            }
        })
    })
   

    request.write(jsonData)
    request.end()
})

app.post("/failure", function (req,res) {
    res.redirect("/")
  })
app.listen(3002, function(){
    console.log("server listening on port 3002")
})

