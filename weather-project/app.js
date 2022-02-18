const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function (req,res) {

   
    res.sendFile(__dirname+"/index.html")
    // res.send("server is up and running")
  })

  app.post("/", function(req,res){
    // console.log(req.body.cityName)
    const query = req.body.cityName
    const apiKey = "9e802e1c8944bab0dbd4e288f236efc4"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+query+"&unit="+unit
      https.get(url, function(response){
    // console.log(response)
    console.log(response.statusCode)
    response.on("data" , function (data) {
        console.log(data)
        const weatherData = JSON.parse(data)
        console.log(weatherData)
        const temp = weatherData.main.temp
        console.log(temp)
        const description = weatherData.weather[0].description
        console.log(description)

        //ONE METHOD TO SEND MULTIPLE LINES TO SERVER USING RES.SEND
        // const displayMsg = `<h1>The temperature in London is = ${temp} degree celcius<h1>
        // <h1>The weather is currently ${description}</h1>`
        // res.send(displayMsg)

        //MAIN METHOD
        res.write("<p>The weather is currently "+ description + " </p>")
        res.write("<h1>The temperature in "+query+" is = "+temp+" degree celcius</h1>")
        
        //getting icon from openweatherapi
        const icon_id = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/"+icon_id+"@2x.png"
        console.log(imageURL)
        res.write("<img src ="+imageURL+">")
        
        res.send()
        // res.send("<h1>The temperature in London is = "+temp+" degree celcius</h1>")
        // const myFav = {
        //     "name": "Rohan",
        // "email":"rtg@rtg.com"
        //     }
        // console.log(JSON.stringify(myFav))
      })
   

})
  })

app.listen(3000, function () {
    console.log("server listening on port 3000")
  })

