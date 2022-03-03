const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fruitsDB")

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
    name: "Apple",
    rating: 5,
    review: "Solid fruit out there"
})

//fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const Person = mongoose.model("Person",personSchema)

const person = new Person({
    name: "John",
    age: 37
})

//person.save()

const mango = new Fruit({
    name: "mango",
    rating: 10,
    review: "best fruit ever"
})
const banana = new Fruit({
    name: "banana",
    rating: 8,
    review: "multi purpose"
})

const orange = new Fruit({
    name: "orange",
    rating: 7,
    review: "sour taste"
})

// Fruit.insertMany([mango, banana, orange], function (err) {
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("successfully inserted")
//     }
//   })

Fruit.find(function (err, fruits) {
    if(err){
        console.log(err)
    }
    else{
        // console.log(fruits)
        mongoose.connection.close()
        fruits.forEach(function (fruit) {
            console.log(fruit.name)
          })
    }
  })



 

  const findDocuments = function (db, callback) {
      const collection =db.collection("fruits")
      collection.find({}).toArray(function (err, fruits) {
          assert.equal(err,null)
          console.log("FOUND THE FOLLOWING RECORDS")
          console.log(fruits)
          callback(fruits)
        })
    }